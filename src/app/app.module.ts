import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { ChesscellComponent } from './chesscell/chesscell.component';
import { GameService } from './services/game.service';
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ChessboardComponent, ChesscellComponent],
  bootstrap: [AppComponent],
  providers: [GameService],
})
export class AppModule {}
