import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css'],
})
export class ChessboardComponent implements OnInit {
  chessBoard = [];

  constructor(private gs: GameService) {}

  ngOnInit() {
    this.chessBoard = this.gs.getChessBoardInitialState();
  }
}
