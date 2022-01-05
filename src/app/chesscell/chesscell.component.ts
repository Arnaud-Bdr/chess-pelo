import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chesscell',
  templateUrl: './chesscell.component.html',
  styleUrls: ['./chesscell.component.css'],
})
export class ChesscellComponent implements OnInit {
  @Input() letter: string;
  @Input() number: number;

  value: number;

  constructor() {}
  ngOnInit() {
    this.value = this.letter.charCodeAt(0) + this.number;
  }
}
