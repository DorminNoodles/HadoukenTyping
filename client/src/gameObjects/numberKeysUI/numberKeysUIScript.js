import Script from "../../script";



class NumberKeysUIScript extends Script {
	constructor() {
		super();
		this.chain = 0;

		this.addListener("deleteLetter", (e) => {
			this.chain++;
			this.object.renderText.changeText(this.chain.toString() + 'keys');
		})
		this.addListener("badLetter", (e) => {
			this.chain = 0;
			this.object.renderText.changeText(this.chain.toString() + 'keys');
		})
	}
}

export default NumberKeysUIScript;
