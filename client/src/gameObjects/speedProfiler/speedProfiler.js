// import { niceFlash } from '../../anim/animSpeedWordUI';
// import Render from '../../render';
import GameObject from '../../gameObject';
import speedProfilerScript from './speedProfilerScript';

const speedProfiler = () => {
	let obj = new GameObject('speedProfiler');

	obj.addScript(new speedProfilerScript());

	// obj.render = new Render('./speedUI.png');
	// obj.render.addAnim(niceFlash);


	return obj;
}

export default speedProfiler;
