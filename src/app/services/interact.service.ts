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
    'Tu joues bien Pélo, va falloir que je me concentre',
    "Mais quelle position de merde, j'aurai pas dû manger avant de jouer",
    "Heureusement que ma spécialité c'est jouer des position perdante Pélo",
    'Je suis pas bien là, je fais des coups à la Acezoo',
  ];

  private joPunchlineNotCool = [
    'Faut se concentrer Pélo',
    'Ma position est écrasante Pélo, je vais te shadow boxer',
    'Tu joues comme Acezoo en sortie de cuite Pélo',
    'Tu te sens pas bien pélo ?',
    "Faut pas s'endormir sur l'échéquier Pélo",
  ];

  private joMsgEqualGame = [
    'La partie est sérrée Pelo, mais tu vas craquer',
    "Je vois pas encore le gain mais ça va arriver ne t'inquiète pas",
    'Tu te bas bien Pelo mais ça va pas durer',
    'Tu joues pour la nulle Pélo ?',
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

  getRandomMsgEqualGame() {
    let r = Math.floor(Math.random() * this.joMsgEqualGame.length);
    return this.joMsgEqualGame[r];
  }
}
