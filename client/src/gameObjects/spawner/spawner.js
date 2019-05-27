import GameObject from '../../gameObject';
import SpawnerScript from './spawnerScript';

const spawner = () => {

	let obj = new GameObject('spawner');

	obj.addScript(new SpawnerScript());

	return obj;
}


export default spawner;
