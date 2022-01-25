import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { GameService } from '../services/game.service';
import { InteractService } from '../services/interact.service';
@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit {
  chessBoard: any[];
  gifs: any[];
  gifContainer: HTMLElement;
  gif: HTMLImageElement;
  timeout: any;
  // Position rating relative to black, positif is good for black, negatif is good for white
  lastPositionRating = 0;
  // Number of move before mate relative to black, positive means that black can mate in X, negative means that white can mate in
  mateIn = 0;
  isCheckmate: boolean = false;
  gameStatus: any = null;

  // Start at position level 2, IE position rating = 0;
  // Use position levels to trigger when Jo should talk
  positionLevel = 2;
  positionLevels = [-1000, -500, 0, 500, 1000];
  turnInSamePositionLevel = 0;

  constructor(
    private gs: GameService,
    private ds: DragService,
    private is: InteractService
  ) {}

  ngOnInit() {
    this.gs.chessboardSubject.subscribe((chessboardSubject) =>
      this.onChessboardSubjectChanged(chessboardSubject)
    );
    this.gs.setChessboardToInitialPosition();
    this.gs.gameStatusSubject.subscribe((gameStatus) =>
      this.onGameStatusChanged(gameStatus)
    );
    this.gifs = this.is.getGifs();
    setTimeout(
      () => this.makeJoTalk('Salut Pélo, prêt pour une partie ?'),
      1500
    );
  }

  onGameStatusChanged(gameStatus) {
    this.gameStatus = gameStatus;
    if (gameStatus.turn.color == 'black') {
      // Check for msg from JO depending on position rating
      if (gameStatus.isCheckmate) {
        this.isCheckmate = true;
        this.makeJoTalk("T'as gagné cette partie Pélo");
        return;
      }
      if (gameStatus.turn.eval['1'][0] != null) {
        this.mateIn = 0;
        let newPositionRating = gameStatus.turn.eval['1'][0];
        this.setNewPositionLevel(newPositionRating);

        // Check if a very good move have been played, then triggers gif
        if (newPositionRating - this.lastPositionRating <= -400) {
          this.resetAndShowGif();
        }
        this.lastPositionRating = newPositionRating;
      } // If there is no evaluation position that means a mate is possible
      else if (this.mateIn == 0) {
        this.mateIn = gameStatus.turn.eval['1'][1];
        if (this.mateIn < 0) {
          this.makeJoTalk(
            'Ma position pue la merde Pélo, pourquoi je blunder comme ça !'
          );
        } else {
          this.makeJoTalk(
            "Je sens qu'il y'a un mate pas loin, fait gaffe Pelo"
          );
        }
      }
    } else if (gameStatus.turn.color == 'white') {
      if (gameStatus.isCheckmate) {
        this.isCheckmate = true;
        this.makeJoTalk('La partie est terminado Pélo');
        return;
      } else if (gameStatus.turn.isInCheck) {
        this.makeJoTalk('Echec au roi Pélo');
      }
    }
  }

  onChessboardSubjectChanged(chessboardSubject) {
    this.chessBoard = chessboardSubject.chessboard;
  }

  test() {}

  makeJoTalk(msg: string) {
    let joMsgDiv = document.getElementById('joMsg');
    joMsgDiv.innerText = msg;
    joMsgDiv.classList.remove('animated');
    // Make browser to reflow otherwise animation will not  be refresh
    joMsgDiv.offsetWidth;
    joMsgDiv.classList.add('animated');
  }

  resetAndShowGif() {
    this.timeout != null ? clearTimeout(this.timeout) : null;
    this.gifContainer != null
      ? (this.gifContainer.style.display = 'none')
      : null;
    setTimeout(() => this.showGif(), 10);
  }

  showGif() {
    let r = Math.floor(Math.random() * this.is.gifs.length);
    this.gifContainer = document.getElementById('gif-container' + r);
    this.gif = <HTMLImageElement>document.getElementById('gif' + r);
    let gifModel = this.is.getGifById(r);
    this.gifContainer.style.display = 'block';
    this.gifContainer.style.animationName = 'show-gif';
    this.gifContainer.style.animationDuration =
      gifModel.durationMS / 1000 + 's';
    this.timeout = setTimeout(() => {
      this.gifContainer.style.display = 'none';
    }, gifModel.durationMS);
  }

  resetBoard() {
    this.lastPositionRating = 0;
    this.isCheckmate = false;
    this.positionLevel = 2;
    this.turnInSamePositionLevel = 0;
    this.mateIn = 0;
    this.gs.setChessboardToInitialPosition();
  }

  setNewPositionLevel(newPositionRating) {
    if (
      this.positionLevel + 1 < this.positionLevels.length &&
      newPositionRating > this.positionLevels[this.positionLevel + 1]
    ) {
      ++this.positionLevel;
      this.is.getRandomPunchNotCool();
    } else if (
      this.positionLevel - 1 > 0 &&
      newPositionRating < this.positionLevels[this.positionLevel - 1]
    ) {
      --this.positionLevel;
      this.is.getRandomPunchCool();
    } else {
      this.turnInSamePositionLevel++;
    }
  }
}
