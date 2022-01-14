import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { GameService } from '../services/game.service';
import { GifService } from '../services/gif.service';
@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css'],
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
    this.gs.chessBoardSubject.subscribe(
      (chessboard) => (this.chessBoard = chessboard)
    );
    this.gs.emitChessBoardSubject();
    this.gs.pieceTakenSubject.subscribe((piece) => this.resetAndShowGif());
    this.gifs = this.gifService.getGifs();
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
}
