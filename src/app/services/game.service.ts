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
  private fen = '';
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

    let pieceTaken = this.chessboardPieces[8 - chessRowDst][chessColDst];
    this.chessboardPieces[8 - chessRowOri][chessColOri] = '';
    this.chessboardPieces[8 - chessRowDst][chessColDst] = pieceType;
    this.emitchessboardSubject();
    let gameStatus = await this.backendService.sendMove(this.fen, ori + dst);
    this.updateGame(gameStatus, pieceTaken);
  }

  async updateGameIA(gameStatus) {
    let newGameStatus = await this.backendService.sendMove(
      this.fen,
      gameStatus.turn.bestMove
    );
    this.fen = newGameStatus.fen;
    this.parseFenChessboardToArray(newGameStatus.fen.split(' ')[0]);
    this.emitchessboardSubject();
  }

  async updateGame(gameStatus, pieceTaken) {
    if (gameStatus != null) {
      this.fen = gameStatus.fen;
      let fenChessboard = gameStatus.fen.split(' ')[0];
      this.parseFenChessboardToArray(fenChessboard);
      if (pieceTaken != '') this.emitPieceTaken(pieceTaken);
      if (gameStatus.turn.color == 'black') {
        await setTimeout(() => athis.updateGameIA(gameStatus), 1000);
      }
    } else {
      this.parseFenChessboardToArray(this.fen);
    }
    this.emitchessboardSubject();
  }

  async setChessboardToInitialPosition() {
    let gameStatus = await this.backendService.getInitBoardState();
    this.updateGame(gameStatus, '');
  }

  parseFenChessboardToArray(fenChessBoard) {
    this.chessboardPieces = [];
    this.chessboardPieces.push([]);
    let rowIndex = 0;
    let charIndex = 0;
    while (charIndex < fenChessBoard.length) {
      let fenComponent = fenChessBoard.charAt(charIndex);
      if (fenComponent == '/') {
        this.chessboardPieces.push([]);
        ++rowIndex;
        // If not number, it's a piece
      } else if (isNaN(fenComponent)) {
        this.chessboardPieces[rowIndex].push(fenComponent);
        // If a number, it's defined number of consecutive blank
      } else {
        let blank = 0;
        while (blank < fenComponent) {
          this.chessboardPieces[rowIndex].push('');
          ++blank;
        }
      }
      ++charIndex;
    }
  }
}
