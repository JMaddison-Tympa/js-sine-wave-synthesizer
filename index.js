// to play 1 second we need array of 44100 numbers
const sampleRate = 44100;

// create a typed array of size 44100 float numbers
const sineWaveArray = new Float32Array(sampleRate);

const hz = 500;

// fill all 44100 elements of array with Math.sin() values
for (i = 0; i < sineWaveArray.length; i+=2) {
  //sineWaveArray[i] = Math.sin(i * Math.PI * 8 / hz);
  sineWaveArray[i] = Math.sin(i * 2*Math.PI * hz / sampleRate);
}

/**
 * Play sound in browser
 * @param array - array of values from -1 to +1 representing sound
 * @param sampleRate - sampling rate to play with, e.g. 44100
 */
function playSound({ array, sampleRate }) {
  // We have to start with creating AudioContext
  const audioContext = new AudioContext({sampleRate});
  // create audio buffer of the same length as our array
  const audioBuffer = audioContext.createBuffer(2, array.length, sampleRate);
  // this copies our sine wave to the audio buffer
  audioBuffer.copyToChannel(array, 0);
  // some JavaScript magic to actually play the sound
  const source = audioContext.createBufferSource();
  source.connect(audioContext.destination);
  source.buffer = audioBuffer;
  source.start();
  console.log('ugh?');
  console.log('playing');
  console.log(array);
}

function playSineWave500hz() {
  playSound({ array: sineWaveArray, sampleRate });
}
