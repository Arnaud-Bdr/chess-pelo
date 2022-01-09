export class GifService {
  baseUrl: String =
    'https://github.com/Arnaud-Bdr/chess-pelo/blob/master/src/app/assets/images/';
  endUrl: String = '?raw=true';
  gifs: any[] = [
    { name: 'jo_come_on_1.gif', durationMS: 6000 },
    { name: 'jo_lets_go_1.gif', durationMS: 2800 },
    { name: 'acezoo_surpris.gif', durationMS: 2500 },
  ];

  getGifById(id: number) {
    let gif = this.gifs[id];
    gif.url = this.baseUrl + gif.name + this.endUrl;
    return gif;
  }

  getGifs() {
    for (let gif of this.gifs) {
      gif.url = this.baseUrl + gif.name + this.endUrl;
    }
    return this.gifs;
  }
}
