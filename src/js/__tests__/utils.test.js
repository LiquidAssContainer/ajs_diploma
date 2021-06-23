import { calcTileType, createCharacterTooltip } from '../utils';
import { Character } from '../Character';

describe('Test calcTileType function', () => {
  test.each([
    ['index = 0, boardsize = 8', 0, 8, 'top-left'],
    ['index = 1, boardsize = 8', 1, 8, 'top'],
    ['index = 7, boardsize = 8', 7, 8, 'top-right'],
    ['index = 8, boardsize = 9', 8, 9, 'top-right'],
  ])('%s', (_, index, boardsize, expected) => {
    const result = calcTileType(index, boardsize);
    expect(result).toBe(expected);
  });
});

describe('Test createCharacterTooltip function', () => {
  test.each([
    [
      'Case 1',
      { level: 1, attack: 40, defence: 10, health: 50 },
      '🎖1 ⚔40 🛡10 ❤50',
    ],
    [
      'Case 2',
      { level: 3, attack: 10, defence: 40, health: 99 },
      '🎖3 ⚔10 🛡40 ❤99',
    ],
  ])('%s', (_, char, expected) => {
    const result = createCharacterTooltip(char);
    expect(result).toBe(expected);
  });
});

describe('Expects error when creating new Character', () => {
  test('Should throw error', () => {
    expect(() => new Character(1)).toThrow(Error('НИЗЯ СОЗДАТЬ ПРОСТО ПЕРСА'));
  });
});
