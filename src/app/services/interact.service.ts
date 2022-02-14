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
    "Heureusement que ma spécialité c'est jouer des positions perdantes Pélo",
    'Je suis pas bien là, je fais des coups à la Acezoo',
    "T'es le cousin de MVL Pélo ? ",
    'Jolie pointe tactique Pélo, je suis pas bien',
  ];

  private joPunchlineNotCool = [
    'Faut se concentrer Pélo',
    'Ma position est écrasante Pélo, je vais te shadow boxer',
    'Tu joues comme Acezoo en sortie de cuite Pélo',
    'Tu te sens pas bien pélo ?',
    "Faut pas s'endormir sur l'échéquier Pélo",
    'Peite pointe tactique du Jo ! *shadow box*',
  ];

  private joMsgEqualGame = [
    'La partie est sérrée Pélo, mais tu vas craquer',
    "Je vois pas encore le gain mais ça va arriver ne t'inquiète pas",
    'Tu te bas bien Pelo mais ça va pas durer',
    'Tu joues pour la nulle Pélo ?',
    "Tu t'es préparé contre moi Pélo ?",
    "J'espère que je ne vais pas faire une Bujisho",
    "En tout cas c'est bien Pélo, tu respectes les principes de l'ouverture",
    "Je connais pas la théorie ici, mais j'ai pas besoin je suis meilleur que toi Pélo",
    "Les parties contre toi sont à deux résultats Pélo, c'est cool",
    'Je sens que ma position va devenir gagnante',
  ];

  private joMsgGoodPosition = [
    "T'es en souffrance Pélo, tu devrais abandonner",
    'Dommage que je puisse pas te mettre la pression au temps Pélo',
    'Je vois des tactiques dans tous les sens Pélo, je vais te Woodpecker',
    "Si t'as encore de la dignité Pélo, abandonne",
    'Pourquoi tu joues Pélo ?',
    'Faut que tu viennes à mon stage de coaching Pélo ...',
  ];

  private JoMsgBadPosition = [
    'Je suis pas bien Pélo, heureusement que je joue mieux les positions perdantes',
    "Putain je suis pas bien, j'aurai pas du manger un grec ce matin",
    'Je me suis pas assez préparé pour ce match Pélo ...',
    "T'es GM ou c'est comment Pélo !",
    "Bordel c'est pas en jouant comme ça que je vais être GM",
    'Je tiens encore Pélo, je lache rien',
    "Je vais t'arnaquer Pélo",
    "Mais quelle position de merde, j'aurai pas dû manger avant de jouer",
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

  getRandomMsgBadPosition() {
    let r = Math.floor(Math.random() * this.JoMsgBadPosition.length);
    return this.JoMsgBadPosition[r];
  }

  getRandomMsgGoodPosition() {
    let r = Math.floor(Math.random() * this.joMsgGoodPosition.length);
    return this.joMsgGoodPosition[r];
  }
}
