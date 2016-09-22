import EventManager from '../eventManager';

class Pawn extends EventManager {
  constructor(config) {
    super(config);
    this.life = config.life || 100;
    this.strength = config.strength || 2;
    this.def = config.def || 2;
  }

  getLife() {
    return this.life;
  }

  getStrength() {
    return this.strength;
  }

  getDef() {
    return this.def;
  }

  attack(target) {
    if (typeof target === 'object') {
      target.recieveAttack(this);
      return true;
    }
    return false;
  }

  recieveAttack(pawnOpponent, strikeBack = false) {
    if (strikeBack === false) {
      this.life = this.life - pawnOpponent.strength;
      pawnOpponent.recieveAttack(this, true)
    } else {
      this.life = this.life - pawnOpponent.def;
    }
  }
}
export default Pawn;