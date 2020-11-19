import GameObject from '../core/gameObject';
import Render from '../render';


class ProgressionBar extends GameObject {

  constructor(name) {
    super(name);
    this.addRender(new Render('../images/progressionBar.png'));
    this.render.setSize(1200, 70);

    this.tick = Date.now() + 200;
    this.playerSections = this.addGameObject(new GameObject('playerSections'));
    this.playerSections.setLocalPosition(105,25);
    this.playerSections.addRender(new Render('../images/progressionBar.png'));
    this.playerSections.render.setSize(446, 35);
    this.playerSections.render.setSource(425, 85);
    this.playerSectionsSX = 425;
    this.playerSourceXMax = this.playerSectionsSX;

    this.addListener('updateProgression', (e) => {

      if (e.detail.player) {
        // console.log("PROGRESSION EVENT", e);
        let progression = Math.round(e.detail.lettersDelete / (e.detail.lettersTotal / 100));
        let sourceX = this.playerSourceXMax - ((this.playerSourceXMax / 100) * progression);
        this.playerSections.render.setSource(sourceX, 85);

      }
    });



  }

  update() {

    // if (this.tick < Date.now()) {
    //   this.tick = Date.now() + 200;
    //   (this.playerSectionsSX - 12 < 2)? this.playerSectionsSX = 2 : this.playerSectionsSX -= 12;
    //   this.playerSections.render.setSource(this.playerSectionsSX, 85);
    // }

  }
}

export default ProgressionBar;