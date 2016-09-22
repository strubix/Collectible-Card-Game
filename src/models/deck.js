class Deck {
  constructor(config) {
    if (typeof config === 'object') {
      this.cards = config.cards || [];
    }
  }

  draw() {
    return this.cards[0];
  }

  shuffle() {
    if (Object.keys(this.cards).length > 0) {
      for (var i = 0; i < this.cards.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (this.cards.length - i));
        var temp = this.cards[j];
        this.cards[j] = this.cards[i];
        this.cards[i] = temp;
      }
    }
  }

  insertAt(card, position) {
    if (typeof card === 'object' && typeof position === 'number') {
      if (position <= this.cards.length) {
        this.cards.splice(position, 0, card);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getCardsCount() {
    return this.cards.length;
  }
}
export default Deck;