import GameObject from '../../gameObject';

const letterAsian = () => {
	let obj = new GameObject('letterAsian');

	obj.addScript(new LetterAsianScript());
	obj.render = new Render('');
}
