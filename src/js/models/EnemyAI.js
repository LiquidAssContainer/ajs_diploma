export default class EnemyAI {
  constructor(gameController) {
    this.gameController = gameController;
    this.movement = gameController.movement;
    this.potentialActions = [];
    this.delay = 100;
  }

  async doAction() {
    return new Promise((resolve) => {
      this.potentialActions = [];
      const enemyChars = this.gameController.getTeamPositions('enemy');
      this.playerChars = this.gameController.getTeamPositions('player');

      for (const char of enemyChars) {
        this.pushCharActions(char);
      }

      const action = this.findBestAction(this.potentialActions);

      const promise = this.performBestAction(action);
      promise.then(() => {
        setTimeout(() => {
          this.gameController.deselectEnemyCharacter();
        }, this.delay);
        resolve();
      });
    });
  }

  performBestAction(action) {
    return new Promise((resolve) => {
      const { actor, target } = action;
      this.gameController.selectEnemyCharacter(actor.position);

      if (this.gameController.isCellAvailableForAttack(actor, target.position)) {
        setTimeout(async () => {
          this.gameController.performAttack(actor, target);
          resolve();
        }, this.delay);
      } else {
        const promise = this.moveToTarget(actor, target);
        promise
          .then(() => {
            resolve();
          })
          .catch(async () => {
            // удаление действия из списка и попытка выполнить другое действие
            const actionIndex = this.potentialActions.findIndex(
              (elem) => elem === action,
            );
            this.potentialActions.splice(actionIndex, 1);
            const nextAction = this.findBestAction(this.potentialActions);

            if (nextAction) {
              await this.performBestAction(nextAction);
              resolve();
            } else {
              console.log('Тупик! Ну вообще странно');
              resolve();
            }
          });
      }
    });
  }

  calculatePriority(enemy, player) {
    const { character, position } = enemy;
    const { moveRange, attackRange } = character;
    const { distance } = this.movement.calculateDistance(position, player.position);

    const turnsNumber = Math.ceil((distance - 1) / (moveRange + attackRange - 1));
    const potentialDamage = character.calculateDamage(player.character);
    const hitsToKill = Math.ceil(player.character.health / potentialDamage);

    return 1 / (hitsToKill + turnsNumber);
  }

  pushCharActions(enemyChar) {
    for (const playerChar of this.playerChars) {
      const priority = this.calculatePriority(enemyChar, playerChar);
      const target = playerChar;
      const action = { actor: enemyChar, target, priority };
      this.potentialActions.push(action);
    }
  }

  findBestAction(actionsArr) {
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

  // вообще не самый удачный и понятный метод получился...
  moveToTarget(actor, target) {
    return new Promise((resolve, reject) => {
      if (this.actionIsDone) return;
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

      let indexToMove = this.movement.calculatePositionByCoordsDifference(index, {
        verticalDiff,
        horizontalDiff,
      });

      // перерасчёт indexToMove, если ячейка занята другим персонажем
      while (
        !this.gameController.isCellEmpty(indexToMove)
        && (Math.abs(verticalDiff) > 0 || Math.abs(horizontalDiff) > 0)
      ) {
        if (Math.abs(verticalDiff) > Math.abs(horizontalDiff)) {
          verticalDiff += isVerticalDiffNegative ? 1 : -1;
        } else {
          horizontalDiff += isHorizontalDiffNegative ? 1 : -1;
        }

        indexToMove = this.movement.calculatePositionByCoordsDifference(index, {
          verticalDiff,
          horizontalDiff,
        });
      }

      if (indexToMove !== index) {
        setTimeout(() => {
          this.movement.moveChar(actor, indexToMove);
          resolve();
        }, this.delay);
      } else {
        reject(new Error('Нет очевидного пути'));
      }
    });
  }
}
