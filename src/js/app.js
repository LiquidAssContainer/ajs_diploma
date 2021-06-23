/**
 * Entry point of app: don't change this
 */
import GamePlay from './models/GamePlay';
import GameController from './models/GameController';
import GameStateService from './models/GameStateService';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const stateService = new GameStateService(localStorage);

const gameCtrl = new GameController(gamePlay, stateService);
gameCtrl.init();

// don't write your code here
