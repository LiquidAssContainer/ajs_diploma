import {
  Daemon, Swordsman, Magician, Bowman, Undead, Vampire,
} from './characters';
import PositionedCharacter from './PositionedCharacter';

export default class GameState {
  // иначе не получалось создавать экземпляры классов
  static characterClasses = {
    daemon: Daemon,
    swordsman: Swordsman,
    magician: Magician,
    bowman: Bowman,
    undead: Undead,
    vampire: Vampire,
  };

  static from({
    positions, currentTurn, currentLevel, points,
  }) {
    const savedPositions = [];

    for (const positionedChar of positions) {
      const { character, position } = positionedChar;
      const properties = { ...character };
      const formattedPositionedChar = {
        position,
        properties,
        constructorName: character.type,
      };
      savedPositions.push(formattedPositionedChar);
    }

    return {
      currentTurn,
      currentLevel,
      points,
      savedPositions,
    };
  }

  static getSavedData({
    currentTurn, currentLevel, points, savedPositions,
  }) {
    const playerCharacters = [];
    const enemyCharacters = [];
    const positions = [];

    for (const savedChar of savedPositions) {
      const { position, properties, constructorName } = savedChar;
      const Constructor = this.characterClasses[constructorName];
      const newChar = new Constructor(1);

      for (const prop in properties) {
        newChar[prop] = properties[prop];
      }

      const positionedChar = new PositionedCharacter(newChar, position);
      positions.push(positionedChar);

      if (newChar.side === 'player') {
        playerCharacters.push(newChar);
      } else {
        enemyCharacters.push(newChar);
      }
    }

    return {
      playerCharacters,
      enemyCharacters,
      gameControllerProperties: {
        currentTurn,
        currentLevel,
        points,
        positions,
      },
    };
  }
}
