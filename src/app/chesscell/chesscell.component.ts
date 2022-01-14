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
    console.log('container ' + event.container.element.nativeElement.id);
    console.log('currrent index ' + event.currentIndex);
    console.log('distance ' + event.distance);
    console.log('item ' + event.item.element.nativeElement.className);
    console.log('previous ' + event.previousContainer.element.nativeElement.id);
    console.log('----------------------------');
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  /*
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('id', ev.target.id);
    this.dragService.setDraggedElement(ev.target);
  }

  drop(ev) {
    ev.preventDefault();
  } */
}
