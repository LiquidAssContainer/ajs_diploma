export default class GameMovement {
  constructor(gamePlay, gameController) {
    this.gamePlay = gamePlay;
    this.gameController = gameController;
  }

  calculatePositionByCoordsDifference(index, { verticalDiff, horizontalDiff }) {
    return index + horizontalDiff + verticalDiff * this.gamePlay.boardSize;
  }

  calculateDistance(charPosition, cellIndex) {
    const { boardSize } = this.gamePlay;
    const verticalDiff = Math.floor(cellIndex / boardSize)
      - Math.floor(charPosition / boardSize);
    const horizontalDiff = (cellIndex % boardSize) - (charPosition % boardSize);
    const distance = Math.max(Math.abs(verticalDiff), Math.abs(horizontalDiff));
    return { distance, verticalDiff, horizontalDiff };
  }

  moveChar(char, index) {
    this.gamePlay.deselectCell(char.position);
    char.position = index;
    this.gameController.redrawPositions();
  }

  isCellAvailableForMove({ character, position }, targetIndex) {
    const { distance } = this.calculateDistance(position, targetIndex);
    const isEmpty = this.gameController.isCellEmpty(targetIndex);
    return isEmpty && character.moveRange >= distance;
  }
}
