import Card from '../src/models/card';

describe('Card', function() {

  describe('constructor()', function() {
    it("accepte 3 paramètres", function() {
      expect(new Card({life: 1, strength: 2, def: 3, type:'card-1'})).toBeDefined();
    });
  });

  describe('getters', function() {
    beforeEach(function() {
      this.test = new Card({life: 4, strength: 2, def: 3, type:'card-1'});
    });

    it("getLife() doit retourner la vie", function() {
      expect(this.test.getLife()).toEqual(4);
    });

    it("getStrength() doit retourner la force", function() {
      expect(this.test.getStrength()).toEqual(2);
    });

    it("getDef() doit retourner la défense", function() {
      expect(this.test.getDef()).toEqual(3);
    });
  });

  describe('attack(), recieveAttack()', function() {
    beforeEach(function() {
      this.attack = new Card({life: 4, strength: 2, def: 3, type:'card-1'});
      this.target = new Card({life: 6, strength: 2, def: 3, type:'card-2'});
    });
    it("Enlève à l'objet target le nombre de points de vie de l'attaquant", function() {
      expect(this.attack.attack(this.target)).toBeTruthy();
      expect(this.target.getLife()).toEqual(4);
    });
    it("Effecture une contre attaque", function() {
      expect(this.attack.attack(this.target)).toBeTruthy();
      expect(this.attack.getLife()).toEqual(1);
    });
  });
});