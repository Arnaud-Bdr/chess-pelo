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
  private lastMoveOri: string = '';
  private lastMoveDst: string = '';
  private pieceTaken: boolean = false;
  chessboardSubject = new Subject<any>();
  gameStatusSubject = new Subject<any>();

  private fenDebug: string = 'k7/p6P/7P/8/8/8/8/7K w - - 0 10';

  constructor(private backendService: BackEndService) {}

  emitchessboardSubject() {
    this.chessboard = [];
    for (let j = 0; j < this.height; ++j) {
      this.chessboard.push([]);
      for (let i = 0; i < this.width; ++i) {
        let yPos = 8 - j;
        let cellPos = this.colLettersArray[i] + yPos;
        let cellMoved =
          this.lastMoveOri == cellPos || this.lastMoveDst == cellPos;
        var cell = {
          letter: this.colLettersArray[i],
          position: { y: 8 - j, x: i },
          piece: this.chessboardPieces[j][i],
          moved: cellMoved,
        };
        this.chessboard[j].push(cell);
      }
    }

    let chessboardsubject = {
      chessboard: this.chessboard,
      lastMoveOri: this.lastMoveOri,
      lastMoveDst: this.lastMoveDst,
    };

    this.chessboardSubject.next(chessboardsubject);
  }

  emitGameStatus() {
    let gameStatusAugmented = {
      game: this.gameStatus,
      pieceTaken: this.pieceTaken,
    };
    this.gameStatusSubject.next(gameStatusAugmented);
    this.pieceTaken = false;
  }

  async movePiece(ori, dst, pieceType) {
    // Do nothing if ori == dst
    if (ori == dst) {
      return;
    }

    let proPiece = '';
    // check for promotion
    if (dst.charAt(0) == 'h' && this.gameStatus.turn.color == 'white') {
      if (confirm('Promote to queen ?')) {
        proPiece = this.gameStatus.turn.color == 'white' ? 'Q' : 'q';
      } else {
        if (confirm('Promote to rook ? Otherwise it will be bishop')) {
          proPiece = this.gameStatus.turn.color == 'white' ? 'R' : 'r';
        } else {
          proPiece = this.gameStatus.turn.color == 'white' ? 'B' : 'b';
        }
      }
    }

    let move = ori + dst + proPiece.toLocaleLowerCase();
  
    // IF move is illegal or it is not our do nothing
    if (
      !this.gameStatus.turn.legalMoves.includes(move) ||
      this.gameStatus.turn.color == 'black'
    ) {
      return;
    }

    let chessColOri = this.colLettersArray.indexOf(ori.charAt(0));
    let chessRowOri = ori.charAt(1);

    let chessColDst = this.colLettersArray.indexOf(dst.charAt(0));
    let chessRowDst = dst.charAt(1);

    this.pieceTaken = this.chessboardPieces[8 - chessRowDst][chessColDst];
    this.chessboardPieces[8 - chessRowOri][chessColOri] = '';
    if (proPiece != ''){
      this.chessboardPieces[8 - chessRowDst][chessColDst] = proPiece;
    } else {
      this.chessboardPieces[8 - chessRowDst][chessColDst] = pieceType;
    }
   

    this.lastMoveOri = ori;
    this.lastMoveDst = dst;
    this.gameStatus.turn.color = 'black';
    // Emit for immediate move rendering before receeiving validation from stockfish engine
    this.emitchessboardSubject();
    let newGameStatus = await this.backendService.sendMove(
      this.gameStatus,
      move
    );
    this.updateGameStatus(newGameStatus);
  }

  async updateGameIA(gameStatus) {
    this.lastMoveOri = gameStatus.turn.bestMove.substring(0, 2);
    this.lastMoveDst = gameStatus.turn.bestMove.substring(2, 4);
    this.gameStatus = await this.backendService.sendMove(
      this.gameStatus,
      gameStatus.turn.bestMove
    );

    this.parseFenToChessoboard(this.gameStatus.fen);
    this.emitGameStatus();
    this.emitchessboardSubject();
  }

  async updateGameStatus(newGameStatus) {
    if (newGameStatus != null) {
      this.gameStatus = newGameStatus;
      this.parseFenToChessoboard(this.gameStatus.fen);
      this.emitGameStatus();
      this.emitchessboardSubject();

      if (this.gameStatus.turn.color == 'black') {
        await setTimeout(() => this.updateGameIA(this.gameStatus), 1000);
      }
    } else {
      this.parseFenToChessoboard(this.gameStatus.fen);
      this.emitchessboardSubject();
    }
  }

  async setChessboardToInitialPosition() {
    //let newGameStatus = await this.backendService.getInitBoardState();
    let newGameStatus = await this.backendService.getBoardState(this.fenDebug);

    this.lastMoveDst = '';
    this.lastMoveOri = '';
    this.updateGameStatus(newGameStatus);
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
