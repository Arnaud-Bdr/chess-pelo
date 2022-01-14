import { Subject } from 'rxjs';

export class GameService {
  chessBoard = [];
  width: number = 8;
  height: number = 8;
  colLettersArray: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  chessBoardSubject = new Subject<any[]>();
  chessBoardPieces = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ];

  emitChessBoardSubject() {
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
    return this.chessBoard;
  }

  movePiece(ori, dst, pieceType) {
    let chessColOri = this.colLettersArray.indexOf(ori.charAt(0));
    let chessRowOri = ori.charAt(1);

    let chessColDst = this.colLettersArray.indexOf(dst.charAt(0));
    let chessRowDst = dst.charAt(1);

    this.chessBoardPieces[chessColOri][chessRowOri] = '  ';
    this.chessBoardPieces[chessColDst][chessRowDst] = pieceType;

    console.log('ori : ' + chessColOri + ' ' + chessRowOri);
    console.log('dst : ' + chessColDst + ' ' + chessRowDst);
    this.emitChessBoardSubject();
  }
}
