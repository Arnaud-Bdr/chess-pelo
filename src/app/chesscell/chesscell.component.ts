import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';
@Component({
  selector: 'chesscell',
  templateUrl: './chesscell.component.html',
  styleUrls: ['./chesscell.component.css'],
})
export class ChesscellComponent implements OnInit {
  @Input() cell: any;
  value: number;

  constructor(private dragService: DragService) {}
  ngOnInit() {
    this.value = this.cell.letter.charCodeAt(0) + this.cell.position.y;
  }

  drop(event: CdkDragDrop<string[]>) {
    let cellOri = event.previousContainer.element.nativeElement.id;
    let cellDest = event.container.element.nativeElement.id;
    let pieceValue = event.item.element.nativeElement.className
      .split(' ')
      .filter((c) => c.length == 2)[0];
    console.log(pieceValue + ' from ' + cellOri + ' to ' + cellDest);

    console.log('----------------------------');
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
