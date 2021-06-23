export class Character {
  constructor(level, type = 'generic') {
    if (new.target.name === 'Character') {
      throw new Error('НИЗЯ СОЗДАТЬ ПРОСТО ПЕРСА');
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this._health = 50;
    this.type = type;
  }

  levelUpNewCharacter() {
    for (let i = 1; i < this.level; i++) {
      this.increaseStat('attack');
      this.increaseStat('defence');
      // this.health += 80;
    }
  }

  levelUp() {
    this.level += 1;
    this.increaseStat('attack');
    this.increaseStat('defence');
    this.health += 80;
  }

  increaseStat(stat) {
    const newValue = Math.max(
      this[stat],
      (this[stat] * (80 + this.health)) / 100,
    );
    this[stat] = Math.floor(newValue);
  }

  get health() {
    return this._health;
  }

  set health(points) {
    this._health = points;
    if (this._health > 100) {
      this._health = 100;
    }
    if (this._health <= 0) {
      this._health = 0;
    }
  }

  calculateDamage(target) {
    const damage = Math.max(this.attack - target.defence, this.attack * 0.1);
    return Math.ceil(damage);
  }
}

export class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(level, type);

    this.attack = 40;
    this.defence = 10;
    this.attackRange = 1;
    this.moveRange = 4;
    this.side = 'player';

    this.levelUpNewCharacter();
  }
}

export class Bowman extends Character {
  constructor(level, type = 'bowman') {
    super(level, type);

    this.attack = 25;
    this.defence = 25;
    this.attackRange = 2;
    this.moveRange = 2;
    this.side = 'player';

    this.levelUpNewCharacter();
  }
}

export class Magician extends Character {
  constructor(level, type = 'magician') {
    super(level, type);

    this.attack = 10;
    this.defence = 40;
    this.attackRange = 4;
    this.moveRange = 1;
    this.side = 'player';

    this.levelUpNewCharacter();
  }
}
export class Daemon extends Character {
  constructor(level, type = 'daemon') {
    super(level, type);

    this.attack = 10;
    this.defence = 40;
    this.attackRange = 4;
    this.moveRange = 1;
    this.side = 'enemy';

    this.levelUpNewCharacter();
  }
}

export class Undead extends Character {
  constructor(level, type = 'undead') {
    super(level, type);

    this.attack = 40;
    this.defence = 10;
    this.attackRange = 1;
    this.moveRange = 4;
    this.side = 'enemy';

    this.levelUpNewCharacter();
  }
}

export class Vampire extends Character {
  constructor(level, type = 'vampire') {
    super(level, type);

    this.attack = 25;
    this.defence = 25;
    this.attackRange = 2;
    this.moveRange = 2;
    this.side = 'enemy';

    this.levelUpNewCharacter();
  }
}
