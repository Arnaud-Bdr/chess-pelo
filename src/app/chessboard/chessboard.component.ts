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
  chessBoard = [];

  gifContainer: HTMLElement;
  gif: HTMLImageElement;

  constructor(
    private gs: GameService,
    private ds: DragService,
    private gifService: GifService
  ) {}

  ngOnInit() {
    this.chessBoard = this.gs.getChessBoardInitialState();
    this.gifContainer = document.getElementById('gif-container');
    this.gif = <HTMLImageElement>document.getElementById('gif');
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData('id');
    this.ds.getDraggedElement().id = '';
    if (ev.target.id == 'cell') {
      ev.target.firstChild.id = id;
    } else {
      if (ev.target.id.includes('q')) {
        this.showGif();
      }
      ev.target.id = id;
    }
  }

  showGif() {
    let gifModel = this.gifService.getGifById(0);
    this.gif.src = gifModel.url;
    this.gifContainer.style.display = 'block';
    this.gifContainer.style.animationName = 'show-gif';
    this.gifContainer.style.animationDuration =
      gifModel.durationMS / 1000 + ' s';
    // Reseting gif state
    setTimeout(() => {
      this.gifContainer.style.display = 'none';
      this.gifContainer.style.animationName = '';
    }, gifModel.durationMS);
  }
}
