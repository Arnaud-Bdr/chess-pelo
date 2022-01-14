import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BackEndService } from './backend.service';

@Injectable()
export class GameService {
  private chessBoard = [];
  private width: number = 8;
  private height: number = 8;
  private colLettersArray: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  private chessBoardPieces = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ];

  chessBoardSubject = new Subject<any[]>();
  pieceTakenSubject = new Subject<any>();

  constructor(private backendService: BackEndService) {}

  emitChessBoardSubject() {
    this.chessBoard = [];
    for (let j = 0; j < this.height; ++j) {
      this.chessBoard.push([]);
      for (let i = 0; i < this.width; ++i) {
        var cell = {
          letter: this.colLettersArray[i],
          position: { y: 8 - j, x: i },
          piece: this.chessBoardPieces[j][i],
        };
        this.chessBoard[j].push(cell);
      }
    }
    this.chessBoardSubject.next(this.chessBoard);
  }

  emitPieceTaken(pieceType) {
    this.pieceTakenSubject.next(pieceType);
  }

  async movePiece(ori, dst, pieceType) {
    // Do nothing if ori == dst
    if (ori == dst) {
      return;
    }

    let chessColOri = this.colLettersArray.indexOf(ori.charAt(0));
    let chessRowOri = ori.charAt(1);

    let chessColDst = this.colLettersArray.indexOf(dst.charAt(0));
    let chessRowDst = dst.charAt(1);

    if (this.chessBoardPieces[8 - chessRowDst][chessColDst] != '') {
      this.emitPieceTaken(this.chessBoardPieces[8 - chessRowOri][chessColOri]);
    }
    this.chessBoardPieces[8 - chessRowOri][chessColOri] = '';
    this.chessBoardPieces[8 - chessRowDst][chessColDst] = pieceType;

    this.emitChessBoardSubject();

    let s: any = await this.backendService.getInitBoardState();
    console.log('S : ' + s.fen);
  }
}
