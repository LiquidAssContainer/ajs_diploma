import {
  Character,
  Daemon,
  Swordsman,
  Magician,
  Bowman,
  Undead,
  Vampire,
} from './characters';
import PositionedCharacter from './PositionedCharacter';

export default class GameState {
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
      const characterProperties = { ...character };

      const formattedPositionedChar = {
        position,
        characterProperties,
        constructorName: character.type,
      };

      savedPositions.push(formattedPositionedChar);
    }

    // console.log(savedPositions);
    const formattedData = {
      currentTurn, currentLevel, points, savedPositions,
    };
    // return JSON.stringify(formattedData);
    return formattedData;
  }

  static parseSavedData({
    currentTurn, currentLevel, points, savedPositions,
  }) {
    // const parsed = JSON.parse(json);
    // console.log(data)
    const parsedData = [];

    for (const savedChar of savedPositions) {
      const { constructorName, position, characterProperties } = savedChar;
      // console.log(constructorName)
      const Constructor = this.characterClasses[constructorName];
      // console.log(Constructor)
      const newChar = new Constructor(1);
      for (const prop in characterProperties) {
        newChar[prop] = characterProperties[prop];
      }
      const positionedChar = new PositionedCharacter(newChar, position);
      parsedData.push(positionedChar);
      // console.log(positionedChar);
    }

    console.log(parsedData);
    return {
      currentTurn, currentLevel, points, positions: parsedData,
    };
  }
}
