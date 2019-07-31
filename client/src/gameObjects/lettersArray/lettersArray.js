import GameObject from '../../core/gameObject';
import LettersArrayScript from './lettersArrayScript';

const lettersArray = () => {

	let obj = new GameObject('lettersArray');

	obj.addScript(new LettersArrayScript());

	return obj;
}


export default lettersArray;
