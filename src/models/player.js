import ModelFactory from './factory';
import Pawn from './pawn';

export default class Player extends Pawn {
  constructor(config) {
    super(config);
    this.type = config.type || '';
    this.deck = config.deck || ModelFactory.get('deck');
    this.board = config.board || ModelFactory.get('board');
    this.cemetary = config.cemetary || ModelFactory.get('cemetary');
    this.hand = config.hand || ModelFactory.get('hand');
  }

  shuffle(cards) {
    if (cards === 'deck') {
      if (Object.keys(this.deck.cards).length > 0) {
        this.deck.shuffle();
        return true;
      }
      return false;
    } else if (cards === 'cemetary') {
      if (Object.keys(this.cemetary.cards).length > 0) {
        this.cemetary.shuffle();
        return true;
      }
      return false;
    }
    return false;
  }

  draw() {
    if (this.deck.cards.length > 0) {
      let salut = this.deck.draw();
      this.hand.cards.push(salut);
      return salut;

    }
    return false;
  }

  playCard(position) {
    if (typeof position === 'number'
        && this.hand.cards.length > 0) {
      this.board.cards.push(this.hand.cards[position]);
      this.hand.cards.splice(position, 1);
      return true;
    }
    return false;
  }

  discard(position) {
    if (typeof position === 'number'
        && this.hand.cards.length > 0) {
      this.cemetary.cards.push(this.hand.cards[position]);
      this.hand.cards.splice(position, 1);
      return true;
    }
    return false;
  }

  attack(position, target) {
    this.board.cards[position].attack(target);
  }
}