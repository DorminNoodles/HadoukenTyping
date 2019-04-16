export const animCombo = {
	name: "animCombo",
	img: './combo.png',
	width: 162,
	height: 150,
	frameNb: 11,
	row: 0,
	col: 0,
	speed: 80,
	loop: false,
	duration: 0,
	nextAnim: 'idleCombo'
}

export const idleCombo = {
	name: "idleCombo",
	img: './combo.png',
	width: 162,
	height: 150,
	frameNb: 1,
	row: 0,
	col: 10,
	speed: 80,
	loop: true,
	duration: 0,
	nextAnim: 'idle'
}
