import ModelFactory from '../models/factory'

import Controller from './dom';
import CardController from './card';

export default class DeckController extends Controller {

    constructor (selector, parent) {
        super(selector, parent);

        this.$dom.on('click', this.onClick.bind(this));

        this.parent.on('drawCard', this.onDrawCard.bind(this));
        this.parent.on('emptyDeck', this.onEmpty.bind(this));

    }

    onClick () {
        this.parent.trigger('clickDeck', this);
    }

    onDrawCard (cardState) {

        var self = this,
            cardCtrl,
            card;
        
        if (cardState !== undefined) {
            cardCtrl = new CardController(self.parent),
            cardCtrl.setState(cardState);

            card = cardCtrl.getDom();
            card.offset(self.$dom.offset());

            card.on('transitionend', function te () {
                card.off('transitionend', te);

                self.parent.trigger('newCard', cardCtrl);
            });
            
            setTimeout(function () {
                cardCtrl.setParent(this);
                card.addClass('draw');

                card.offset({"left": (self.parent.getDom().width() / 2) - (card.width() / 2), "top": (card.offset().top + (self.parent.side === "up" ? 1 : -1) * 100) });
            }, 10);

            if (self.getSide() === 'down') {
                setTimeout(function () {
                    card.addClass('flip');
                    card.offset({"left": (self.parent.getDom().width() / 2) - (card.width() / 2), "top": (card.offset().top + (self.parent.side === "up" ? 1 : -1) * 100) });
                }, 200);            
            }              
        }
    }

    onEmpty () {
        this.$dom.addClass('empty');
    }    

}