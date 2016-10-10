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
    this[cards].shuffle();
    return true;
  }

  draw() {
    return this.deck.draw();
  }

  playCard(position) {
    let card = this.hand.removeCard(position);
    if (card !== false) {
      this.board.addCard(card);
    }
  }

  discard(position) {
    let card = this.hand.removeCard(position);
    if (card !== false) {
      this.cemetary.addCard(card);
    }
  }

  attack(position, target) {
    this.board.cards[position].attack(target);
  }
}