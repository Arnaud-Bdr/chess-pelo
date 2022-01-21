import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { GameService } from '../services/game.service';
import { GifService } from '../services/gif.service';
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

  constructor(
    private gs: GameService,
    private ds: DragService,
    private gifService: GifService
  ) {}

  ngOnInit() {
    this.gs.chessboardSubject.subscribe((chessboardSubject) =>
      this.onChessboardSubjectChanged(chessboardSubject)
    );
    this.gs.setChessboardToInitialPosition();
    this.gs.gameStatusSubject.subscribe((gameStatus) =>
      this.onGameStatusChanged(gameStatus)
    );
    this.gifs = this.gifService.getGifs();
  }

  onGameStatusChanged(gameStatus) {
    if (gameStatus.pieceTaken) {
      this.resetAndShowGif();
    }
  }

  onChessboardSubjectChanged(chessboardSubject) {
    this.chessBoard = chessboardSubject.chessboard;
  }

  resetAndShowGif() {
    this.timeout != null ? clearTimeout(this.timeout) : null;
    this.gifContainer != null
      ? (this.gifContainer.style.display = 'none')
      : null;
    setTimeout(() => this.showGif(), 10);
  }

  showGif() {
    let r = Math.floor(Math.random() * this.gifService.gifs.length);
    this.gifContainer = document.getElementById('gif-container' + r);
    this.gif = <HTMLImageElement>document.getElementById('gif' + r);
    let gifModel = this.gifService.getGifById(r);
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
