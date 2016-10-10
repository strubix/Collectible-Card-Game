import Deck from '../src/models/deck';
import Card from '../src/models/card';

describe('Deck', function() {

  describe('constructor()', function() {
    it("Accepte un objet en premier argument", function() {
      expect(new Deck('foo').constructor).toThrow();
    });
    it("Cet objet doit contenir un tableau cards", function() {
      expect(new Deck({
        "cards": [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
          life: 6,
          strength: 2,
          def: 1,
          face: 'card-2'
        })]
      }).cards).toBeDefined();
    });
  });

  describe('draw()', function() {
    beforeEach(function() {
      this.test = new Deck({
        "cards": [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
          life: 6,
          strength: 2,
          def: 1,
          face: 'card-2'
        })]
      });
    });
    it("Doit retourner la première carte du paquet", function() {
      expect(this.test.draw()).toEqual(new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }));
    });
    it("Doit retourner undefined si il n'y a plus de carte dans le paquet", function() {
      this.test.cards = [];
      expect(this.test.draw()).toBeUndefined();
    });
  });

  describe('shuffle()', function() {
    it("Doit mélanger les cartes du paquet", function() {
      var test = new Deck({
        "cards": [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
          life: 4,
          strength: 2,
          def: 3,
          face: 'card-2'
        }), new Card({ life: 4, strength: 2, def: 3, face: 'card-3' }), new Card({
          life: 4,
          strength: 2,
          def: 3,
          face: 'card-4'
        })]
      });
      var testCards = [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
        life: 4,
        strength: 2,
        def: 3,
        face: 'card-2'
      }), new Card({ life: 4, strength: 2, def: 3, face: 'card-3' }), new Card({
        life: 4,
        strength: 2,
        def: 3,
        face: 'card-4'
      })];

      testCards = [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' })];
      test.cards = [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' })];
      var count = 0;
      while (test.cards === testCards || count < (1000 * 1000)) {
        test.shuffle();
        count++;
      }
      expect(count).not.toEqual(1000 * 1000);

      expect(test.cards).toBeDefined();
    });
  });

  describe('insertAt()', function() {
    beforeEach(function() {
      this.test = new Deck({
        "cards": [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
          life: 4,
          strength: 2,
          def: 3,
          face: 'card-3'
        })]
      });
    });
    it("Prend deux paramètres", function() {
      expect(this.test.insertAt('test', 52)).toBeFalsy();
      expect(this.test.insertAt(new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), 52)).toBeFalsy();
    });
    it("Ajoute une carte dans le paquet", function() {
      this.test.insertAt(new Card({ life: 4, strength: 2, def: 3, face: 'card-2' }), 1);
      expect(this.test.cards).toEqual([new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
        life: 4,
        strength: 2,
        def: 3,
        face: 'card-2'
      }), new Card({ life: 4, strength: 2, def: 3, face: 'card-3' })]);
    });
  });

  describe('getCardsCount()', function() {
    it("Retourne le nombre de carte actuellement dans le deck", function() {
      const test = new Deck({
        "cards": [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({
          life: 4,
          strength: 2,
          def: 3,
          face: 'card-1'
        }), new Card({ life: 4, strength: 2, def: 3, face: 'card-1' })]
      });
      expect(test.getCardsCount()).toEqual(3);
    });
  });
});