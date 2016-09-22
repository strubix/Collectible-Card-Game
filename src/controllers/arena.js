import ModelFactory from '../models/factory';

import Controller from './dom';

import SideController from './side';

var secondClick = false;

export default class ArenaController extends Controller {

  constructor() {
    super('body');

    this.up = new SideController(".side.opponent", this);
    this.down = new SideController(".side.player", this);

    this.game = ModelFactory.get('game', {
      'up': ModelFactory.get('player', { type: 'computer' }),
      'down': ModelFactory.get('player', { type: 'human' })
    });

    this.on('clickDeck', this.onClickDeck.bind(this));
    this.on('clickHand', this.onClickHand.bind(this));
    this.on('clickBoard', this.onClickBoard.bind(this));
    this.on('targetHand', this.onTargetHand.bind(this));
    this.on('clickEndTurn', this.onClickEndTurn.bind(this));
  }

  onClickDeck(deck) {
    console.log('arena.js', deck);
    var s = deck.getSide();

    var self = this;
    var cardState = this.game[s].draw();

    cardState.getSide = function() {
      return s;
    };
    self.trigger('drawCard', cardState);

    if (self.game[s].deck.getCardsCount() === 0) {
      self.trigger('emptyDeck');
    }
  }


  onClickHand(card) {
    // api call then
    this.trigger('playCard', card);
  }

  onClickBoard(card) {
    var self = this;
    if (!secondClick) {
      this.trigger('activateCard', card);
      secondClick = true;
    } else {
      this.trigger('targetCard', card);

      setTimeout(function() {
        self.trigger('discardCard', card);
      }, 4000);
      secondClick = false;
    }
  }

  onTargetHand(hand) {
    if (secondClick) {
      this.trigger('attackHand', hand);
    }
  }

  onClickEndTurn() {
    var self = this;
    this.trigger('endTurn', {
      getSide: () => {
        return 'down'
      }
    });
    console.log('end turn');

    setTimeout(function() {
      self.trigger('yourTurn', {
        getSide: () => {
          return 'down'
        }
      });
      console.log('your turn');
    }, 5000);
  }
}