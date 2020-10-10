
import GameObject from '../core/gameObject';
import Render from '../render';

class TextRender extends GameObject {

  constructor(name) {
      super(name);

      this.ref = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

      // let alphabet = []

      // for (let i = 0; i < 30; i++) {
      //   alphabet[i] = this.addGameObject(new GameObject());
      //   alphabet[i].setPosition(40+(i*30), 300);
      //   alphabet[i].addRender(new Render('../../images/gameFont1.png'));
      //   alphabet[i].render.width = 30;
      //   alphabet[i].render.height = 45;
      //   alphabet[i].render.sourceX = 30 * i;
      // }
  }

  update() {
      // console.log("Hello !!!");
  }

  write(pos, text) {
    this.deleteAllChilds();
    console.log("write");
    text.split('').forEach((letter, index) => {
      console.log(letter);
      let tmp = this.addGameObject(new GameObject());
      tmp.setPosition((index*30), 300);
      tmp.addRender(new Render('../../images/gameFont1.png'));
      tmp.render.width = 36;
      tmp.render.height = 45;
      tmp.render.sourceX = 46 * this.ref.indexOf(letter);
    })
  }
}

export default TextRender;