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
  private gameStatus: any;

  chessboardSubject = new Subject<any[]>();
  gameStatusSubject = new Subject<any>();

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

  emitGameStatus() {
    this.gameStatusSubject.next(this.gameStatus);
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

    // Emit for immediate move rendering before receveiving validation from from stockfish engine
    this.emitchessboardSubject();
    let newGameStatus = await this.backendService.sendMove(
      this.gameStatus,
      ori + dst
    );
    this.updateGameStatus(newGameStatus, pieceTaken);
  }

  async updateGameIA(gameStatus) {
    this.gameStatus = await this.backendService.sendMove(
      this.gameStatus,
      gameStatus.turn.bestMove
    );
    this.parseFenToChessoboard(this.gameStatus.fen);
    this.emitGameStatus();
    this.emitchessboardSubject();
  }

  async updateGameStatus(newGameStatus, pieceTaken) {
    if (newGameStatus != null) {
      this.gameStatus = newGameStatus;
      this.parseFenToChessoboard(this.gameStatus.fen);
      this.emitGameStatus();
      this.emitchessboardSubject();
      //if (pieceTaken != '') this.emitPieceTaken(pieceTaken);
      if (this.gameStatus.turn.color == 'black') {
        await setTimeout(() => this.updateGameIA(this.gameStatus), 1000);
      }
    } else {
      this.parseFenToChessoboard(this.gameStatus.fen);
      this.emitchessboardSubject();
    }
  }

  async setChessboardToInitialPosition() {
    let newGameStatus = await this.backendService.getInitBoardState();
    this.updateGameStatus(newGameStatus, '');
  }

  parseFenToChessoboard(fen) {
    let fenChessBoard = fen.split(' ')[0];
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
