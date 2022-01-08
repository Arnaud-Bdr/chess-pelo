export class GameService {

  chessBoard = [];
  width: number = 8;
  height: number = 8;
  rowLetterArray: string[] = ['a', 'b', 'c', 'd', 'e' ,'f' , 'g', 'h'];
  chessBoardPieces = [ ['br','bn','bb','bq','bk','bb','bn','br'],
                       ['bp','bp','bp','bp','bp','bp','bp','bp'],
                       ['  ','  ','  ','  ','  ','  ','  ','  '],
                       ['  ','  ','  ','  ','  ','  ','  ','  '],
                       ['  ','  ','  ','  ','  ','  ','  ','  '],
                       ['  ','  ','  ','  ','  ','  ','  ','  '],
                       ['wp','wp','wp','wp','wp','wp','wp','wp'],
                       ['wr','wn','wb','wq','wk','wb','wn','wr']
]
  getChessBoardInitialState(){
    for (let j = 0; j < this.height; ++j) {
      this.chessBoard.push([]);
      for (let i = 0; i < this.width; ++i) {
        var cell = { letter : this.rowLetterArray[i],
                     number : 8-j,
                     piece : this.chessBoardPieces[j][i] }
        this.chessBoard[j].push(cell);
      }
    }
    return this.chessBoard;
  }
}