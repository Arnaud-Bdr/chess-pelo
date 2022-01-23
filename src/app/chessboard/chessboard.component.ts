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
  // Position rating relative to black
  positionRating = 0;

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
    if (gameStatus.turn.color == 'black') {
      // Check for msg from JO depending on position rating
      if (gameStatus.turn.eval['1'][0] != null) {
        if (gameStatus.isGameOver) {
          this.makeJoTalk("T'as gagné cette partie Pélo");
          return;
        }
        let diffRating = gameStatus.turn.eval['1'][0] - this.positionRating;
        console.log('Diff Rating' + diffRating);
        if (diffRating <= -400) {
          this.makeJoTalk('Tres bon coup pélo');
          this.resetAndShowGif();
        } else if (diffRating <= -300) {
          this.makeJoTalk(this.is.getRandomPunchCool());
        } else if (diffRating >= 300) {
          this.makeJoTalk(this.is.getRandomPunchNotCool());
        }
        this.positionRating = gameStatus.turn.eval['1'][0];
      }
    } else if (gameStatus.turn.color == 'white') {
      if (gameStatus.isGameOver) {
        this.makeJoTalk('La partie est terminado Pélo');
        return;
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
    this.gs.setChessboardToInitialPosition();
  }
}
