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
      if (!ev.target.id.includes('p')) {
        this.resetAndShowGif();
      }
      ev.target.id = id;
    }
  }

  resetAndShowGif() {
    this.gif.src = '';
    this.gifContainer.style.display = 'none';
    this.gifContainer.style.animationName = '';
    //this.gifContainer.style.animationDuration = '0';
    setTimeout(() => this.showGif(), 50);
  }

  showGif() {
    let r = Math.floor(Math.random() * this.gifService.gifs.length);
    console.log(r);
    let gifModel = this.gifService.getGifById(r);
    this.gif.src = gifModel.url;
    this.gifContainer.style.display = 'block';
    this.gifContainer.style.animationName = 'show-gif';
    let duration = gifModel.durationMS / 1000 + 's';
    this.gifContainer.style.animationDuration = duration;
    console.log(duration);
  }

  reset;
}
