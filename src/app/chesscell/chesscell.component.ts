import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
import { GameService } from '../services/game.service';
@Component({
  selector: 'chesscell',
  templateUrl: './chesscell.component.html',
  styleUrls: ['./chesscell.component.css'],
})
export class ChesscellComponent implements OnInit {
  @Input() cell: any;
  @Input() gameStatus: any;
  value: number;
  moved: boolean = false;
  isBlack: boolean = false;
  isCheckmate: boolean = false;
  isInCheck: boolean = false;
  id: string;

  constructor(
    private dragService: DragService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.value = this.cell.letter.charCodeAt(0) + this.cell.position.y;
    this.isBlack = this.value % 2 == 0;
    this.id = this.cell.letter + this.cell.position.y;
    this.moved = this.cell.moved;
    if (this.gameStatus.turn.color == 'black') {
      if (this.cell.piece == 'k') {
        this.isCheckmate = this.gameStatus.isCheckmate;
        this.isInCheck = this.gameStatus.turn.isInCheck;
      }
    } else if (this.gameStatus.turn.color == 'white') {
      if (this.cell.piece == 'K') {
        this.isCheckmate = this.gameStatus.isCheckmate;
        this.isInCheck = this.gameStatus.turn.isInCheck;
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    let cellOri = event.previousContainer.element.nativeElement.id;
    let cellDst = event.container.element.nativeElement.id;
    let pieceValue = event.item.element.nativeElement.className
      .split(' ')
      .filter((c) => c.length == 1)[0];
    this.gameService.movePiece(cellOri, cellDst, pieceValue);
  }
}
