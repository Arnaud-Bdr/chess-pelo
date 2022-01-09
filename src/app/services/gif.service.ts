export class gifService {
  baseUrl: String =
    'https://github.com/Arnaud-Bdr/chess-pelo/blob/master/src/app/assets/images/';
  endUrl: String = '?raw=true';
  gifs: any[] = [{ name: 'jo_come_on_1.gif', durationMS: 6000 }];

  getGifsById(id: number) {
    return this.gifs[i];
  }
}
