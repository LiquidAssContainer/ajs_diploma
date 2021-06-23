// import PositionedCharacter from './PositionedCharacter';
import {
  Character,
  Daemon,
  Swordsman,
  Magician,
  Bowman,
  Undead,
  Vampire,
} from './characters';

export default class Team {
  constructor({ side, allowedTypes, maxLevel, characterCount }) {
    this.side = side;
    this.characters = [];
    this.addNewCharacters(allowedTypes, maxLevel, characterCount);
  }

  *[Symbol.iterator]() {
    const { characters } = this;
    const { length } = characters;

    for (let i = 0; i < length; i += 1) {
      yield [...characters][i];
    }
  }

  get length() {
    return this.characters.length;
  }

  generateCharacter(allowedTypes, maxLevel) {
    const index = Math.floor(Math.random() * allowedTypes.length);
    const characterConstructor = allowedTypes[index];
    const level = Math.floor(Math.random() * maxLevel + 1);
    return new characterConstructor(level);
  }

  addNewCharacters(allowedTypes, maxLevel, characterCount) {
    for (let i = 1; i <= characterCount; i++) {
      const newChar = this.generateCharacter(allowedTypes, maxLevel, this);
      this.characters.push(newChar);
    }
  }

  removeChar(character) {
    const index = this.characters.findIndex((elem) => elem === character);
    if (index !== -1) {
      this.characters.splice(index, 1);
    }
  }

  charsLevelUp() {
    for (const char of this.characters) {
      char.levelUp();
    }
  }
}
