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
    if (card <= this.cards.length - 1) {
      this.cards.splice(card, 1);
      return true;
    } else {
      return false;
    }
  }

  getAllCards() {
    return this.cards;
  }

  getCardsCount() {
    return this.cards.length;
  }
}
export default Hand;