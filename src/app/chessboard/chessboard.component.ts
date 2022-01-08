import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { GameService } from '../services/game.service';
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
        document.getElementById('gif').style.display = 'block';
        document.getElementById('gif').style.animationName = 'show-gif';
        // Reseting gif state
        setTimeout(() => {
          document.getElementById('gif').style.display = 'none';
          document.getElementById('gif').style.animationName = '';
        }, 5900);
      }
      ev.target.id = id;
    }
  }
}
