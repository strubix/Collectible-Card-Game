import EventManager from '../eventManager';

class Game extends EventManager {
  constructor(config) {
    super(config);
    this.up = config.up;
    this.down = config.down;
    this.turn = 'down';
  }

  getTurn() {
    return this.turn;
  }

  changeTurn() {
    return this.getTurn() === 'up' ? this.turn = 'down' : this.turn = 'up';
  }

  proxy(side, action, payload = false) {
    if(payload !== false){
      return side[action](payload);
    }
    return side[action]();
  }
}
export default Game;