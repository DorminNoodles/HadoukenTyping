


class Letter {
	constructor() {

	}

	getLetters(nb) {
		let arr = [];

		for (var i = 0; i < nb; i++){
			arr.push({
				char: alpha[getRandomInt(26)],
				valid: false
			});
		}
		return arr;
	}

	checkValid(arr) {
		let valid = true;
		arr.forEach((elm) => {
			if (!elm.valid)
				valid = false
		})
		return valid;
	}


}
