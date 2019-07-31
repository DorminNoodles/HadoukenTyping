// import { niceFlash } from '../../anim/animSpeedWordUI';
// import Render from '../../render';
import GameObject from '../../core/gameObject';
import speedProfilerScript from './speedProfilerScript';

const speedProfiler = () => {
	let obj = new GameObject('speedProfiler');

	obj.addScript(new speedProfilerScript());


	return obj;
}

export default speedProfiler;
