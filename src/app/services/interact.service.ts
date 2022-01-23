export class InteractService {
  baseUrl: String =
    'https://github.com/Arnaud-Bdr/chess-pelo/blob/master/src/app/assets/images/';
  endUrl: String = '?raw=true';
  gifs: any[] = [
    { name: 'jo_come_on_1.gif', durationMS: 6000 },
    { name: 'jo_lets_go_1.gif', durationMS: 2800 },
    { name: 'acezoo_surpris.gif', durationMS: 2500 },
  ];

  private joPunchlineCool = [
    "C'est bien joué pélo",
    'Continue comme ça pélo',
    'Je viens de prendre une droite',
    'Tu te bas bien pélo',
  ];

  private joPunchlineNotCool = [
    'Donne pas tes pièces en un Pélo',
    'Pas très bon coup ça Pélo',
    'Tu joues comme Acezoo en sortie de cuite Pélo',
    'Tu te sens pas bien pélo ?',
    "Faut pas s'endormir sur l'échéquier pelo",
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

  getRandomPunchCool() {
    let r = Math.floor(Math.random() * this.joPunchlineCool.length);
    return this.joPunchlineCool[r];
  }
  getRandomPunchNotCool() {
    let r = Math.floor(Math.random() * this.joPunchlineNotCool.length);
    return this.joPunchlineNotCool[r];
  }
}
