export default class EnemyAI {
  constructor(gameController) {
    this.gameController = gameController;
    this.movement = gameController.movement;
    // this.team = gameController.enemyTeam;
    // this.playerTeam = gameController.playerTeam;
    this.potentialActions = [];
  }

  doAction() {
    this.potentialActions.length = 0;
    const enemyChars = this.gameController.getTeamPositions('enemy');
    this.playerChars = this.gameController.getTeamPositions('player');

    for (const char of enemyChars) {
      const bestAction = this.findCharBestAction(char);
      this.potentialActions.push(bestAction);
    }
    const action = this.findTeamBestAction(this.potentialActions);
    this.performBestAction(action);
  }

  calculatePriority(enemy, player) {
    const { character, position } = enemy;
    const { moveRange, attackRange } = character;
    const { distance } = this.movement.calculateDistance(
      position,
      player.position,
    );

    const turnsNumber = Math.ceil(
      (distance - 1) / (moveRange + attackRange - 1),
    );
    const potentialDamage = character.calculateDamage(player.character);
    const hitsToKill = Math.ceil(player.character.health / potentialDamage);

    return 1 / (hitsToKill + turnsNumber);
  }

  findCharBestAction(enemyChar) {
    let highestPriority = 0;
    let target;

    for (const playerChar of this.playerChars) {
      const priority = this.calculatePriority(enemyChar, playerChar);
      if (priority > highestPriority) {
        highestPriority = priority;
        target = playerChar;
      }
    }
    return { actor: enemyChar, target, priority: highestPriority };
  }

  findTeamBestAction(actionsArr) {
    let mostEffectiveAction;
    let highestPriority = 0;
    for (const action of actionsArr) {
      if (action.priority > highestPriority) {
        highestPriority = action.priority;
        mostEffectiveAction = action;
      }
    }
    return mostEffectiveAction;
  }

  performBestAction(action) {
    console.log(this.playerTeam);
    const { actor, target } = action;
    this.gameController.selectEnemyCharacter(actor.position);
    setTimeout(() => {
      if (
        this.gameController.isCellAvailableForAttack(actor, target.position)
      ) {
        this.gameController.performAttack(actor, target);
      } else {
        this.moveToTarget(actor, target);
      }
      setTimeout(() => {
        this.gameController.deselectEnemyCharacter(actor.position);
        const { playerTeam } = this.gameController;
        if (playerTeam.length !== 0) {
          console.log('enemyai');
          this.gameController.switchTurn();
        }
      }, 100);
    }, 100);
  }

  moveToTarget(actor, target) {
    const {
      character: { moveRange },
      position: index,
    } = actor;

    let { verticalDiff, horizontalDiff } = this.movement.calculateDistance(
      index,
      target.position,
    );

    const isVerticalDiffNegative = verticalDiff < 0;
    const isHorizontalDiffNegative = horizontalDiff < 0;

    if (Math.abs(verticalDiff) > moveRange - 1) {
      verticalDiff = moveRange;
    } else if (verticalDiff !== 0) {
      verticalDiff = Math.abs(verticalDiff) - 1;
    }

    if (Math.abs(horizontalDiff) > moveRange - 1) {
      horizontalDiff = moveRange;
    } else if (horizontalDiff !== 0) {
      horizontalDiff = Math.abs(horizontalDiff) - 1;
    }

    if (isVerticalDiffNegative) verticalDiff *= -1;
    if (isHorizontalDiffNegative) horizontalDiff *= -1;

    const indexToMove = this.movement.calculatePositionByCoordsDifference(
      index,
      { verticalDiff, horizontalDiff },
    );
    // if (this.movement.isCellAvailableForMove(actor, indexToMove)) {
    // }
    console.log('indexToMove', indexToMove);
    this.movement.moveChar(actor, indexToMove);
  }
}
