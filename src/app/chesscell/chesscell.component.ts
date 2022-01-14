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
  value: number;

  constructor(
    private dragService: DragService,
    private gameService: GameService
  ) {}
  ngOnInit() {
    this.value = this.cell.letter.charCodeAt(0) + this.cell.position.y;
  }

  drop(event: CdkDragDrop<string[]>) {
    let cellOri = event.previousContainer.element.nativeElement.id;
    let cellDst = event.container.element.nativeElement.id;
    let pieceValue = event.item.element.nativeElement.className
      .split(' ')
      .filter((c) => c.length == 2)[0];
    console.log(pieceValue + ' from ' + cellOri + ' to ' + cellDst);
    this.gameService.movePiece(cellOri, cellDst, pieceValue);
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
