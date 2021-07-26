import Amplifier from "../effectors/Amplifier";
import Chorus from "../effectors/Chorus";
import Delay from "../effectors/Delay";
import Distortion from "../effectors/Distortion";
import ImpulseResponse from "../effectors/ImpulseResponse";
import Input from "../effectors/Input";
import Output from "../effectors/Output";
import MetalZone from "../effectors/MetalZone";

let context;
const EFFECTOR_CLASSES = {
  'Amplifier': Amplifier,
  'Chorus': Chorus,
  'Delay': Delay,
  'Distortion': Distortion,
  'ImpulseResponse': ImpulseResponse,
  'Input': Input,
  'Output': Output,
  'MetalZone': MetalZone,
};

function getBoardChain (context) {
  return [...document.querySelector("#board-liner").children].map((child) => {
    const dataId = child.dataset.id;
    return (dataId !== 'undefined') ? dataId : undefined;
  }).filter(el => !!el).map(effectorName => getEffector(effectorName, context));
};

function isSameArray(a, b) {
  return a.length === b.length && a.every((el, i) => el === b[i]);
}

function getEffector(effectorName, context) {
  const effectorClass = EFFECTOR_CLASSES[effectorName];
  if (!effectorClass) {
    throw new Error(`Effector ${effectorName} not found`);
  }
  return new effectorClass(context);
}

let prevChain = [];
export const changeSoundChain = () => {
  const currentChain = getBoardChain(context);
  if (isSameArray(prevChain, currentChain)) {
    console.log('isSame');
  } else {
    console.log('changed', currentChain);  
    prevChain = currentChain;

    createAudioStream();
  };
}

async function createAudioStream () {
  context = new AudioContext();
  const guitarSource = await getGuitar();

  if (context.state === 'suspended') {
    await context.resume();
  }

  const inputNode = context.createMediaStreamSource(guitarSource);
  const outputNode = context.destination;
  const boardChain = getBoardChain(context);
  const chainLength = boardChain.length;
  console.log(boardChain);

  // start chain
  inputNode.connect(boardChain[0].input);


  // process chain
  for (let i = 1; i < chainLength; i++) {
    boardChain[i].connect(boardChain[i - 1]);
  }

  // end chain
  boardChain[chainLength - 1].output.connect(outputNode);
}

function getGuitar () {
  return navigator.mediaDevices.getUserMedia({
      audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          latency: 0
      }
  })
}


createAudioStream();
