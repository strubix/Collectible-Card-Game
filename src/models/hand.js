class Hand {
  constructor(config) {
    if (typeof config === 'object') {
      this.cards = config.cards || [];
      this.limit = config.limit || 7;
    }
  }

  addCard(card) {
    if (this.cards.length < this.limit) {
      this.cards.push(card);
      return true;
    } else {
      return false;
    }
  }

  removeCard(card) {
    return this.cards.splice(card, 1);
  }

  getAllCards() {
    return this.cards;
  }

  getCardsCount() {
    return this.cards.length;
  }
}
export default Hand;