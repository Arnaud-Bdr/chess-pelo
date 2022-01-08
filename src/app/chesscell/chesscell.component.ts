import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chesscell',
  templateUrl: './chesscell.component.html',
  styleUrls: ['./chesscell.component.css'],
})
export class ChesscellComponent implements OnInit {
  @Input() cell: any;
  value: number;

  constructor() {}
  ngOnInit() {
    this.value = this.cell.letter.charCodeAt(0) +this.cell.position.y;
  }
}
