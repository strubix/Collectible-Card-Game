import Hand from '../src/models/hand';
import Card from '../src/models/card';

describe('Hand', function() {

  describe('constructor()', function() {
    it("Accepte un objet en premier argument", function() {
      expect(new Hand('foo').constructor).toThrow();
    });
    it("Cet objet doit contenir un tableau cards", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')] });
      expect(test.cards).toBeDefined();
      expect(test.limit).toBe(7);
    });
    it("Cet objet doit contenir un index limit", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')], limit: 10 });
      expect(test.cards).toBeDefined();
      expect(test.limit).toBe(10);
    });
  });

  describe('addCard()', function() {
    it("Ajoute une carte (qui est passé en paramètre) à la fin de la liste des cartes déjà dans la main", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')], limit: 3 });
      expect(test.addCard(new Card(4, 2, 3, 'card-3'))).toBeTruthy();
      expect(test.cards).toEqual([new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2'), new Card(4, 2, 3, 'card-3')]);
    });
    it(" si la limite est déjà atteinte, la méthode doit retourner false", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')], limit: 2 });
      expect(test.addCard(new Card(4, 2, 3, 'card-1'))).toBeFalsy();
    });
  });

  describe('removeCard()', function() {
    it("Retire de la main la carte positionnée à l’index passé en paramètre", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')], limit: 3 });
      expect(test.removeCard(1)).toBeTruthy();
      expect(test.cards).toEqual([new Card(4, 2, 3, 'card-1')]);
      expect(test.removeCard(1)).toBeFalsy();
      expect(test.removeCard(10)).toBeFalsy();
    });
  });

  describe('getAllCards()', function() {
    it("Retourne un tableau contenant toutes les cartes de la main", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')], limit: 3 });
      expect(test.getAllCards()).toEqual([new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')]);
    })
  });

  describe('getCardsCount()', function() {
    it("Retourne le nombre de carte actuellement dans la main", function() {
      let test = new Hand({ "cards": [new Card(4, 2, 3, 'card-1'), new Card(6, 2, 1, 'card-2')], limit: 3 });
      expect(test.getCardsCount()).toBe(2);
    })
  });
});