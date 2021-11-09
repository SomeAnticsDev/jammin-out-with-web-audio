import './style.css'

const canvas = document.querySelector('canvas');
const gainReadout = document.querySelector('#gain');
const frequencyReadout = document.querySelector('#frequency');
const waveformReadout = document.querySelector('#waveform');

const audioContext = new AudioContext();
const oscillatorNode = audioContext.createOscillator();
oscillatorNode.type = 'sine';
oscillatorNode.frequency.setValueAtTime(260, audioContext.currentTime);
oscillatorNode.start();
audioContext.suspend();

const gainNode = audioContext.createGain();
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
oscillatorNode.connect(gainNode);
gainNode.connect(audioContext.destination);

canvas.addEventListener('click', () => {
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	} else {
		audioContext.suspend();
	}
});

canvas.addEventListener('mousemove', (event) => {
	let newFrequency = event.offsetX;
	let newGain = (canvas.height - event.offsetY) / 500;

	oscillatorNode.frequency.setValueAtTime(newFrequency, audioContext.currentTime);
	gainNode.gain.setValueAtTime(newGain, audioContext.currentTime);

	frequencyReadout.innerHTML = newFrequency;
	gainReadout.innerHTML = newGain;
});

document.addEventListener('keypress', (event) => {
	switch (event.key) {
		case '1':
			oscillatorNode.type = 'sawtooth';
			waveformReadout.innerHTML = 'Sawtooth';
			break;
		case '2':
			oscillatorNode.type = 'sine';
			waveformReadout.innerHTML = 'Sine';
			break;
		case '3':
			oscillatorNode.type = 'square';
			waveformReadout.innerHTML = 'Square';
			break;
		case '4':
			oscillatorNode.type = 'triangle';
			waveformReadout.innerHTML = 'Triangle';
			break;
		default:
			return;
	}
});