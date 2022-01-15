import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BackEndService {
  rootUrl: string = 'https://fast-citadel-36391.herokuapp.com/game?';
  constructor(private httpClient: HttpClient) {}

  async getInitBoardState() {
    let answer;
    await this.httpClient
      .get<any>(this.rootUrl + 'fen=&move=&format=json')
      .toPromise()
      .then((ans) => {
        answer = ans;
      })
      .catch((error) => {
        console.log('Erreur ! : ' + error);
      });

    /*.subscribe(
      (ans) => {answer = ans},
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );*/
    console.log(answer);
    return answer;
  }

  async sendMove(fen, move) {
    let answer;
    await this.httpClient
      .get<any>(this.rootUrl + 'fen=' + fen + '&move=' + move + '&format=json')
      .toPromise()
      .then((ans) => {
        answer = ans;
      })
      .catch((error) => {
        console.log('Erreur ! : ' + error);
      });

    console.log(answer);
    return answer;
  }
}
