import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { GameService } from '../services/game.service';
import { polyfill } from 'mobile-drag-drop';
@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css'],
})
export class ChessboardComponent implements OnInit {
  chessBoard = [];

  constructor(private gs: GameService, private ds: DragService) {}

  ngOnInit() {
    this.chessBoard = this.gs.getChessBoardInitialState();
    console.log('cc');
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
      ev.target.id = id;
    }
  }
  dragenter(event) {
    event.preventDefault();
  }
}
