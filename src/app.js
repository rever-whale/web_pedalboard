import Board from "./components/Board";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/modal";
import { createAudioStream } from "./core/AudioEngine";
import {bindEvent} from './core/Event';

const app = document.querySelector('#app');

new Header(app);
new Board(app);
new Footer(app);
new Modal(app);

bindEvent();
createAudioStream();
