import './styles.css';
const sg = require('./snakegame');

window.onload = () => {
  window.addEventListener('keydown', sg.controller);
  setInterval(sg.core, 1000 / 15);
}