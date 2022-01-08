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

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('id', ev.target.id);
    this.dragService.setDraggedElement(ev.target);
  }

  drop(ev) {
    console.log('ICI');
    ev.preventDefault();
  }
}
