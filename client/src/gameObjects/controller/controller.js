import GameObject from '../../core/gameObject';
import ControllerScript from './controllerScript';


class Controller extends GameObject {

    constructor(name) {
        console.log("Controller GAMEOBJECT");
        super(name);
        this.addScript(new ControllerScript());
    }

}

export default Controller;