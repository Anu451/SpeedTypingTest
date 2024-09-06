const sentences = `The quick brown fox jumps over the lazy dog.
Sphinx of black quartz, judge my vow.
Pack my box with five dozen liquor jugs.
How vexingly quick daft zebras jump!`;

let startBtn = document.getElementById('start-btn');
let inputField = document.getElementById('input');
let paraEle = document.getElementById('sentence');
let timerEle = document.getElementById('timer');
let resultEle = document.getElementById('result');
let retryEle = document.getElementById('retry-btn');
let speedEle = document.getElementById('speed');
let accuracyEle = document.getElementById('accuracy');

let seconds = 30;
let timer;
let startTime;

startBtn.addEventListener('click', () => {
	inputField.disabled = false;

	paraEle.textContent = sentences;
	timerEle.textContent = `Time left ${seconds}s`;
	startBtn.disabled = true;

	inputField.focus();
	startTime = Date.now();
	timerFun();
});

function timerFun() {
	timer = setInterval(() => {
		seconds--;
		timerEle.textContent = `Time left ${seconds}s`;

		if (seconds <= 0) {
			clearInterval(timer);
			timerEle.textContent = '';

			resultDispay();
		}
	}, 1000);
}

function resultDispay() {
	resultEle.style.display = 'block';
	inputField.disabled = true;
	startBtn.disabled = true;

	const typedText = inputField.value.trim();
	const words = typedText.split(' ');
	const correctWords = countCorrectWords(typedText);
	const totalWords = sentences.split(' ').length;
	const totalCharacters = sentences.length;
	const correctCharacters = countCorrectCharacters(typedText);

	const timeTaken = (Date.now() - startTime) / 1000; // in seconds
	const typingSpeed = (correctWords / timeTaken) * 60;
	const accuracy = (correctCharacters / totalCharacters) * 100;

	speedEle.textContent = typingSpeed.toFixed(2);
	accuracyEle.textContent = accuracy.toFixed(2);
	// resultEle.innerHTML = `
	//   <p>Typing Speed: ${typingSpeed.toFixed(2)} WPM</p>
	//   <p>Accuracy: ${accuracy.toFixed(2)}%</p>
	// `;
}

function countCorrectWords(typedText) {
	const typedWords = typedText.split(' ');
	const sentenceWords = sentences.split(' ');

	let correctWords = 0;

	for (let i = 0; i < typedWords.length; i++) {
		if (typedWords[i] === sentenceWords[i]) {
			correctWords++;
		}
	}

	return correctWords;
}

function countCorrectCharacters(typedText) {
	let correctCharacters = 0;

	for (let i = 0; i < typedText.length; i++) {
		if (typedText[i] === sentences[i]) {
			correctCharacters++;
		}
	}

	return correctCharacters;
}

retryEle.addEventListener('click', () => {
	resultEle.style.display = 'none';
	startBtn.disabled = false;
	inputField.disabled = false;

	inputField.value = '';
	seconds = 30;
	timerEle.textContent = `Time left ${seconds}s`;

	timerFun();
});
