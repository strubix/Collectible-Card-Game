import Game from '../src/models/game';
import Player from '../src/models/player';

describe('Game', function() {
  beforeEach(function() {
    this.test = new Game({ up: new Player({}), down: new Player({}) });
  });

  describe('getTurn()', function() {
    it("Retourne une chaine qui indique le tour en cours", function() {
      expect(this.test.getTurn()).toEqual('down');
    });
  });

  describe('changeTurn()', function() {
    it("Retourne une chaine qui indique le tour en cours", function() {
      expect(this.test.changeTurn()).toEqual('up');
      expect(this.test.changeTurn()).toEqual('down');
      expect(this.test.changeTurn()).toEqual('up');
      expect(this.test.changeTurn()).toEqual('down');
    });
  });

  describe('proxy()', function() {
    it("Exécute la méthode indiquée pour le joueur désigné avec la méthode en paramètre", function() {
      expect(this.test.proxy(this.test.up, 'draw')).toBeTruthy();
      expect(this.test.proxy(this.test.up, 'shuffle', 'deck')).toBeTruthy();
      expect(this.test.proxy(this.test.up, 'shuffle', 'cemetary')).toBeFalsy();
    });
  });
});