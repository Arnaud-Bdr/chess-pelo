import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BackEndService } from './backend.service';

@Injectable()
export class GameService {
  private chessboard = [];
  private width: number = 8;
  private height: number = 8;
  private colLettersArray: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  private chessboardPieces = [];
  /*[
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]; */

  chessboardSubject = new Subject<any[]>();
  pieceTakenSubject = new Subject<any>();

  constructor(private backendService: BackEndService) {}

  emitchessboardSubject() {
    this.chessboard = [];
    for (let j = 0; j < this.height; ++j) {
      this.chessboard.push([]);
      for (let i = 0; i < this.width; ++i) {
        var cell = {
          letter: this.colLettersArray[i],
          position: { y: 8 - j, x: i },
          piece: this.chessboardPieces[j][i],
        };
        this.chessboard[j].push(cell);
      }
    }
    this.chessboardSubject.next(this.chessboard);
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

    if (this.chessboardPieces[8 - chessRowDst][chessColDst] != '') {
      this.emitPieceTaken(this.chessboardPieces[8 - chessRowOri][chessColOri]);
    }
    this.chessboardPieces[8 - chessRowOri][chessColOri] = '';
    this.chessboardPieces[8 - chessRowDst][chessColDst] = pieceType;

    this.emitchessboardSubject();
  }

  async setChessboardToInitialPosition() {
    let gameStatus = await this.backendService.getInitBoardState();
    let fenchessboard = gameStatus.fen.split(' ')[0];
    this.parseFenChessboardToArray(fenchessboard);
    this.emitchessboardSubject();
  }

  parseFenChessboardToArray(fenChessBoard) {
    this.chessboardPieces = [];
    let rowsNumber = 0;
    let charIndex = 0;
    while (charIndex < fenChessBoard.length) {
      this.chessboardPieces.push([]);
      ++rowsNumber;
      console.log('cc' + charIndex);
      let fenComponent = fenChessBoard.charAt(charIndex);
      while (fenComponent != '/') {
        // If not a number it's a piece
        if (isNaN(fenComponent)) {
          this.chessboardPieces[rowsNumber - 1].push(fenComponent);
          // If a number, it's defined number of consecutive blank
        } else {
          let blank = 0;
          while (blank < fenComponent) {
            this.chessboardPieces[rowsNumber - 1].push('');
            ++blank;
          }
        }
        ++charIndex;
        fenComponent = fenChessBoard.charAt();
      }
      ++charIndex;
    }
  }
}
