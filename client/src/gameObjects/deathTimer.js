
import GameObject from '../core/gameObject';
import TextRender from './textRender';

class DeathTimer extends GameObject {

  constructor(name, seconds) {
    super(name);

    this.text = this.addGameObject(new TextRender('Timer'));
    this.endTime = Date.now() + (seconds * 1000);
    this.stop = false;
    this.nextWrite = Date.now();
  }

  update() {

    if (this.endTime - Date.now() < 0 && !this.stop) {
      this.stop = true;
      this.text.write(null, '');
      return;
    }

    if (!this.stop && this.nextWrite < Date.now()) {
      // console.log("432111k: write !");
      this.text.write(null, (this.endTime - Date.now()) + '');
      // this.endTime -= Date.now();
      this.nextWrite = Date.now() + 200;
    }
  }
}

export default DeathTimer;