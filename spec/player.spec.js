import Player from '../src/models/player';
import Card from '../src/models/card';

describe('Player', function() {
  beforeEach(function() {
    this.test = new Player({ life: 100, strength: 2, def: 8 });
    this.cardSample = [
      new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }),
      new Card({ life: 4, strength: 2, def: 3, face: 'card-2' }),
      new Card({ life: 4, strength: 2, def: 3, face: 'card-3' }),
      new Card({ life: 4, strength: 2, def: 3, face: 'card-4' })
    ];
  });

  describe('constructor()', function() {
    it("Accepte un objet en premier argument", function() {
      expect(this.test.deck).toBeDefined();
      expect(this.test.board).toBeDefined();
      expect(this.test.hand).toBeDefined();
      expect(this.test.cemetary).toBeDefined();
    });
  });
  describe('shuffle()', function() {
    it("Mélange le deck", function() {
      this.test.deck.cards = [];
      expect(this.test.shuffle('deck')).toBeFalsy();
      this.test.deck.cards = this.cardSample;
      expect(this.test.shuffle('deck')).toBeTruthy();
      expect(this.test.shuffle('deck')).toBeTruthy();
      expect(this.test.shuffle('deck')).toBeTruthy();
      expect(this.test.shuffle('deck')).toBeTruthy();
      expect(this.test.deck.cards).not.toEqual([
        new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }),
        new Card({ life: 4, strength: 2, def: 3, face: 'card-2' }),
        new Card({ life: 4, strength: 2, def: 3, face: 'card-3' }),
        new Card({ life: 4, strength: 2, def: 3, face: 'card-4' })
      ]);
    });

    it("Mélange le cemetary", function() {
      expect(this.test.shuffle('cemetary')).toBeFalsy();
      this.test.cemetary.cards = this.cardSample;
      expect(this.test.shuffle('cemetary')).toBeTruthy();
      expect(this.test.shuffle('cemetary')).toBeTruthy();
      expect(this.test.shuffle('cemetary')).toBeTruthy();
      expect(this.test.shuffle('cemetary')).toBeTruthy();
      expect(this.test.cemetary.cards).not.toEqual([
        new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }),
        new Card({ life: 4, strength: 2, def: 3, face: 'card-2' }),
        new Card({ life: 4, strength: 2, def: 3, face: 'card-3' }),
        new Card({ life: 4, strength: 2, def: 3, face: 'card-4' })
      ]);
    });
  });

  describe('draw()', function() {
    it("Doit piocher la première carte du deck du joueur", function() {
      let card = this.test.deck.cards[0];
      expect(this.test.draw()).toBeTruthy();
      expect(this.test.hand.cards[0]).toEqual(card);
    });
  });

  describe('playCard()', function() {
    it("Retire une carte de la main du joueur", function() {
      this.test.draw();
      this.test.playCard(0);
      expect(this.test.hand.cards).toEqual([]);
    });

    it("L’ajoute à son board", function() {
      this.test.draw();
      let card = this.test.hand.cards[0];
      this.test.playCard(0);
      expect(this.test.board.cards[0]).toEqual(card);
    });

    it("Retourne true en cas de succès, false sinon", function() {
      expect(this.test.playCard(0)).toBeFalsy();
      this.test.draw();
      expect(this.test.playCard(0)).toBeTruthy();
    });
  });

  describe('discard()', function() {
    it("Retire une carte de la main du joueur", function() {
      this.test.draw();
      this.test.discard(0);
      expect(this.test.hand.cards).toEqual([]);
    });

    it("L’ajoute à son cimetière", function() {
      this.test.draw();
      let card = this.test.hand.cards[0];
      this.test.discard(0);
      expect(this.test.cemetary.cards[0]).toEqual(card);
    });

    it("Retourne true en cas de succès, false sinon", function() {
      expect(this.test.discard(0)).toBeFalsy();
      this.test.draw();
      expect(this.test.discard(0)).toBeTruthy();
    });
  });

  describe('attack()', function() {
    it("Doit déclencher une attaque avec la carte désignée du board", function() {
      let target = new Card({life: 10, strength: 2, def: 2});
      this.test.draw();
      this.test.playCard(0);
      this.test.attack(0, target);
      expect(target).toEqual(new Card({ life: 8, strength: 2, def: 2, face: undefined }));
    });
  });
});