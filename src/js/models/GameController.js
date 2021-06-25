import GameState from './GameState';
import PositionedCharacter from './PositionedCharacter';
import Team from './Team';
import themes from '../constants/themes';
import cursors from '../constants/cursors';
import { createCharacterTooltip } from '../utils';
import EnemyAI from './EnemyAI';
import GameMovement from './GameMovement';
import {
  Daemon,
  Swordsman,
  Magician,
  Bowman,
  Undead,
  Vampire,
} from './characters';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.movement = new GameMovement(gamePlay, this);
    this.playerCharacterTypes = [Swordsman, Magician, Bowman];
    this.currentLevel = 0;
    this.currentTurn = 'player';
    this.enemyAI = new EnemyAI(this);
    this.selectedChar = null;
    this.playerOptions = {
      side: 'player',
      allowedTypes: [Swordsman, Magician, Bowman],
      maxLevel: 1,
      characterCount: 2,
    };
  }

  init() {
    this.gamePlay.addCellEnterListener((index) => this.onCellEnter(index));
    this.gamePlay.addCellClickListener((index) => this.onCellClick(index));
    this.gamePlay.addCellLeaveListener((index) => this.onCellLeave(index));
    this.gamePlay.addSaveGameListener(() => {
      const data = GameState.from(this);
      this.stateService.save(data);
    });
    this.gamePlay.addLoadGameListener(() => this.loadHandler());
    this.gamePlay.addNewGameListener(() => this.startNewGame());

    this.startNewGame();
    // this.stateService.load();
  }

  loadHandler() {
    const data = this.stateService.load();
    const savedData = GameState.getSavedData(data);
    const {
      gameControllerProperties: properties,
      playerCharacters,
      enemyCharacters,
    } = savedData;

    for (const prop in properties) {
      this[prop] = properties[prop];
    }
    this.playerTeam.characters = playerCharacters;
    this.enemyTeam.characters = enemyCharacters;
    this.gamePlay.changeTheme(this.currentLevel);
    this.redrawPositions();
    if (this.currentTurn === 'enemy') {
      this.handleEnemyTurn();
    }
  }

  startNewGame() {
    this.points = 0;
    this.playerTeam = new Team(this.playerOptions);
    this.enemyTeam = this.generateEnemyTeam();
    this.positions = [];
    this.positionChars(this.playerTeam, this.enemyTeam);

    this.currentLevel = 0;
    this.startNextLevel();

    this.redrawPositions();
  }

  startNextLevel() {
    this.currentLevel += 1;
    if (this.currentLevel > 4) {
      this.gamePlay.showMessage('Вы победили, вы круты!');
      this.startNewGame();
    }

    this.currentTurn = 'player';
    this.selectedChar = null;
    this.gamePlay.drawUi(themes[this.currentLevel]);

    if (this.currentLevel > 1) {
      this.positions = [];
      this.isLevelStart = true;
      this.recalculatePoints();
      this.playerTeam.charsLevelUp();

      const maxLevel = this.currentLevel - 1;
      this.playerTeam.addNewCharacters(this.playerCharacterTypes, maxLevel, maxLevel);
      this.enemyTeam = this.generateEnemyTeam();

      this.positionChars(this.playerTeam, this.enemyTeam);
      this.redrawPositions();
    }
  }

  generateEnemyTeam() {
    const options = {
      side: 'enemy',
      allowedTypes: [Daemon, Undead, Vampire],
      maxLevel: this.currentLevel,
      characterCount: this.playerTeam.length,
    };
    return new Team(options, this);
  }

  generatePosition(side) {
    const { boardSize } = this.gamePlay;
    const rowStart = Math.floor(Math.random() * boardSize) * boardSize;
    const randomOffset = Math.floor(Math.random() * 2);
    const teamOffset = side === 'enemy' ? boardSize - 2 : 0;
    return rowStart + randomOffset + teamOffset;
  }

  positionChars(...teams) {
    for (const team of teams) {
      for (const char of team) {
        let position;
        do {
          position = this.generatePosition(team.side);
        } while (this.getCharByPosition(position));

        const positionedChar = new PositionedCharacter(char, position);
        this.positions.push(positionedChar);
      }
    }
  }

  isCellAvailableForAttack(actor, targetPosition) {
    const { character, position } = actor;
    const target = this.getCharByPosition(targetPosition);
    const { distance } = this.movement.calculateDistance(position, targetPosition);
    return target && character.attackRange >= distance;
  }

  recalculatePoints() {
    let sum = 0;
    for (const char of this.playerTeam) {
      sum += char.health;
    }
    this.points += sum;

    const [pointsDiv] = document.getElementsByClassName('player-points');
    pointsDiv.textContent = `Количество баллов: ${this.points}`;
  }

  getTeamPositions(side) {
    const positions = this.positions.filter((char) => char.character.side === side);
    return positions;
  }

  getCharByPosition(index) {
    const positionedChar = this.positions.find((char) => char.position === index);
    return positionedChar || null;
  }

  removePositionedChar(positionedChar) {
    const index = this.positions.findIndex((elem) => elem === positionedChar);
    if (index !== -1) {
      this.positions.splice(index, 1);
    } else {
      throw new Error('Невозможно удалить несуществующего персонажа');
    }
    if (this.selectedChar === positionedChar) {
      this.selectedChar = null;
    }
  }

  redrawPositions() {
    this.gamePlay.redrawPositions(this.positions);
    if (this.selectedChar) {
      const index = this.selectedChar.position;
      this.gamePlay.selectCell(index, 'yellow');
    }
  }

  selectEnemyCharacter(index) {
    this.gamePlay.selectCell(index, 'red');
  }

  deselectEnemyCharacter(index) {
    if (index) {
      this.gamePlay.deselectCell(index);
    } else {
      const selected = document.getElementsByClassName('selected-red');
      selected.forEach((elem) => elem.classList.remove('selected-red'));
    }
  }

  switchTurn(delay = 0) {
    return new Promise((resolve) => {
      this.currentTurn = this.currentTurn === 'player' ? 'enemy' : 'player';
      // довольно костыльное решение проблемы, когда в начале след. уровня ходит противник
      if (this.isLevelStart) {
        this.isLevelStart = false;
        this.currentTurn = 'player';
        return;
      }
      setTimeout(() => {
        if (this.currentTurn === 'enemy') {
          this.handleEnemyTurn();
        } else {
          this.handlePlayerTurn();
        }
        resolve();
      }, delay);
    });
  }

  async handleEnemyTurn() {
    this.gamePlay.isPlayerFrozen = true;
    this.gamePlay.setCursor(cursors.notallowed);

    await this.enemyAI.doAction();
    await this.switchTurn(100);
  }

  handlePlayerTurn() {
    this.gamePlay.isPlayerFrozen = false;
    this.onCellEnter(this.gamePlay.lastEnteredCellIndex);
  }

  commitTeamDefeat(side) {
    if (side === 'player') {
      this.gamePlay.showMessage('Вы проиграли =( Попробуйте заново');
      this.startNewGame();
    } else {
      this.startNextLevel();
    }
  }

  removeCharacter(positionedChar, side) {
    const team = side === 'player' ? this.playerTeam : this.enemyTeam;
    this.removePositionedChar(positionedChar);
    team.removeChar(positionedChar.character);
    if (!team.length) {
      this.commitTeamDefeat(side);
    }
  }

  performAttack(actor, target) {
    const actorChar = actor.character;
    const targetChar = target.character;
    const damage = actorChar.calculateDamage(targetChar);
    targetChar.health -= damage;
    this.gamePlay.showDamage(target.position, damage);

    if (targetChar.health <= 0) {
      this.removeCharacter(target, targetChar.side);
    }
    if (targetChar.side === 'player') {
      this.gamePlay.deselectCell(target.position);
    }

    this.redrawPositions();
  }

  async onCellClick(index) {
    const selectedCell = document.getElementsByClassName('selected')[0];
    if (selectedCell) {
      selectedCell.classList.remove('selected', 'selected-yellow');
    }

    if (
      this.selectedChar
      && this.movement.isCellAvailableForMove(this.selectedChar, index)
    ) {
      this.movement.moveChar(this.selectedChar, index);
      await this.switchTurn();
      return;
    }

    if (this.isCellOfPlayer(index)) {
      this.gamePlay.selectCell(index);
      this.selectedChar = this.getCharByPosition(index);
    }

    if (this.isCellOfEnemy(index)) {
      if (this.selectedChar && this.isCellAvailableForAttack(this.selectedChar, index)) {
        const char = this.selectedChar;
        const enemy = this.getCharByPosition(index);
        this.performAttack(char, enemy);
        await this.switchTurn();
      }
    }
  }

  onCellEnter(index) {
    if (!this.isCellEmpty(index)) {
      const positionedChar = this.positions.find((elem) => elem.position === index);
      const { character } = positionedChar;
      const message = createCharacterTooltip(character);
      this.gamePlay.showCellTooltip(message, index);
    } else if (this.selectedChar) {
      this.handleAimAtEmptyCell(this.selectedChar, index);
    }

    if (this.isCellOfPlayer(index)) {
      this.gamePlay.setCursor(cursors.pointer);
    }

    if (this.selectedChar && this.isCellOfEnemy(index)) {
      this.handleAimAtEnemy(this.selectedChar, index);
    }
  }

  onCellLeave(index) {
    if (this.selectedChar?.position !== index) {
      this.gamePlay.deselectCell(index);
    }

    this.gamePlay.setCursor(cursors.auto);
    const cell = this.gamePlay.cells[index];
    if (cell.classList.contains('character')) {
      this.gamePlay.hideCellTooltip(index);
    }
  }

  getCellChildByIndex(index) {
    const cell = this.gamePlay.cells[index];
    return cell.firstChild;
  }

  isCellOfPlayer(index) {
    const cellChild = this.getCellChildByIndex(index);
    return cellChild?.classList.contains('player');
  }

  isCellOfEnemy(index) {
    const cellChild = this.getCellChildByIndex(index);
    return cellChild?.classList.contains('enemy');
  }

  isCellEmpty(index) {
    const cellChild = this.getCellChildByIndex(index);
    return !cellChild;
  }

  handleAimAtEnemy(playerChar, index) {
    if (this.isCellAvailableForAttack(playerChar, index)) {
      this.gamePlay.setCursor(cursors.crosshair);
      this.gamePlay.selectCell(index, 'red-dashed');
    } else {
      this.gamePlay.setCursor(cursors.notallowed);
    }
  }

  handleAimAtEmptyCell(playerChar, index) {
    if (this.movement.isCellAvailableForMove(playerChar, index)) {
      this.gamePlay.setCursor(cursors.pointer);
      this.gamePlay.selectCell(index, 'green');
    } else {
      this.gamePlay.setCursor(cursors.notallowed);
    }
  }
}
