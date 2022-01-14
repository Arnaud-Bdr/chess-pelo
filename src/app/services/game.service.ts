import { Subject } from 'rxjs';

export class GameService {
  private chessBoard = [];
  private width: number = 8;
  private height: number = 8;
  private colLettersArray: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  private chessBoardPieces = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ];

  chessBoardSubject = new Subject<any[]>();

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

  movePiece(ori, dst, pieceType) {
    let chessColOri = this.colLettersArray.indexOf(ori.charAt(0));
    let chessRowOri = ori.charAt(1);

    let chessColDst = this.colLettersArray.indexOf(dst.charAt(0));
    let chessRowDst = dst.charAt(1);

    this.chessBoardPieces[8 - chessRowOri][chessColOri] = '  ';
    this.chessBoardPieces[8 - chessRowDst][chessColDst] = pieceType;

    console.log('ori : ' + chessColOri + ' ' + chessRowOri);
    console.log('dst : ' + chessColDst + ' ' + chessRowDst);
    this.emitChessBoardSubject();
  }
}
