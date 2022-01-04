import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chesscell',
  templateUrl: './chesscell.component.html',
  styleUrls: ['./chesscell.component.css'],
})
export class ChesscellComponent implements OnInit {
  @Input() i: number;
  @Input() j: number;

  constructor() {}
  ngOnInit() {}
}
