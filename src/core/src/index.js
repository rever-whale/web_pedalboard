const volume = document.getElementById('volume');
const drive = document.getElementById('drive');
const bass = document.getElementById('bass');
const mid = document.getElementById('mid');
const treble = document.getElementById('treble');
const visualizer = document.getElementById('visualizer');

const context = new AudioContext();
const analyserNode = new AnalyserNode(context, { fftSize: 128 });
const gainNode = new GainNode(context, { gain: volume.value });
const bassEQ = new BiquadFilterNode(context, {
    type: 'lowshelf',
    frequency: 500,
    gain: bass.value
})
const midEQ = new BiquadFilterNode(context, {
    type: 'peaking',
    Q: Math.SQRT1_2,
    frequency: 1500,
    gain: mid.value
})

const trebleEQ = new BiquadFilterNode(context, {
    type: 'highshelf',
    frequency: 3000,
    gain: treble.value
})

// for the mono input
const panNode = new StereoPannerNode(context, {
    pan: -0.5
});
const convolverNode = new ConvolverNode(context);

// effector
const driveNode = new WaveShaperNode(context);

setupEventListeners();
setupContext();
resize();
drawVisualizer();

function makeDistortionCurve(amount) { // function to make curve shape for distortion/wave shaper node to use
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

async function createIR () {
    let response = await fetch('ir.wav');
    let arrayBuffer = await response.arrayBuffer();
    convolverNode.buffer = await context.decodeAudioData(arrayBuffer);
} 

function setupEventListeners () {
    window.addEventListener('resize', resize);

    volume.addEventListener('input', e => {
        const value = parseFloat(e.target.value);
        gainNode.gain.setTargetAtTime(value, context.currentTime, .01);
    })

    bass.addEventListener('input', e => {
        const value = parseFloat(e.target.value);
        bassEQ.gain.setTargetAtTime(value, context.currentTime, .01);
    })

    mid.addEventListener('input', e => {
        const value = parseFloat(e.target.value);
        midEQ.gain.setTargetAtTime(value, context.currentTime, .01);
    })

    treble.addEventListener('input', e => {
        const value = parseFloat(e.target.value);
        trebleEQ.gain.setTargetAtTime(value, context.currentTime, .01);
    })

    drive.addEventListener('input', e => {
        const value = parseFloat(e.target.value);
        driveNode.curve = makeDistortionCurve(value);
    })

    
}

async function setupContext () {
    const guitar = await getGuitar();

    if (context.state === 'suspended') {
        await context.resume();
    }
    
    await createIR();

    const source = context.createMediaStreamSource(guitar);
    source
        .connect(driveNode)
        .connect(bassEQ)
        .connect(midEQ)
        .connect(trebleEQ)
        .connect(gainNode)
        .connect(panNode)
        .connect(convolverNode)
        .connect(analyserNode)
        .connect(context.destination);
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

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteFrequencyData(dataArray);

    const width = visualizer.width;
    const height = visualizer.height;
    const barWidth = width / bufferLength;

    const canvasContext = visualizer.getContext('2d');
    canvasContext.clearRect(0, 0, width, height);

    dataArray.forEach((item, index) => {
        const y = item / 255 * height / 2;
        const x = barWidth * index;

        canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`;
        canvasContext.fillRect(x, height - y, barWidth, y);
    })
}

function resize () {
    visualizer.width = visualizer.clientWidth * window.devicePixelRatio;
    visualizer.height = visualizer.clientHeight * window.devicePixelRatio;
}
