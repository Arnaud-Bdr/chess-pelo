import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css'],
})
export class ChessboardComponent implements OnInit {
  chessBoard: number[][] = [];
  width: number = 8;
  height: number = 8;

  constructor() {}

  ngOnInit() {
    for (let j = 0; j < this.height; ++j) {
      this.chessBoard.push([]);
      for (let i = 0; i < this.width; ++i) {
        this.chessBoard[j].push(i);
      }
    }
  }
}
