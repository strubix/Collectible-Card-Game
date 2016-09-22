import Controller from './dom';

export default class HandController extends Controller {

    constructor (selector, parent) {
        super(selector, parent);

        this.mCards = []

        this.$dom.find('.end-turn').on('click', this.onClickEndTurn.bind(this));
        this.$dom.find('.shield').on('click', this.onClickShield.bind(this));

        this.domTarget = this.$dom.find('.shield');

        this.on('clickCard', this.onClickCard.bind(this));

        this.parent.on('newCard', this.onNewCard.bind(this));
        this.parent.on('playCard', this.onPlayCard.bind(this));
    }

    onClickEndTurn () {
        this.parent.trigger('clickEndTurn');
    }

    onClickShield () {
        this.parent.trigger('targetHand', this);
    }

    onClickCard (card) {
        this.parent.trigger('clickHand', card);
    }


    onNewCard (card) {
        var state = card.getState();
        state.position = this.mCards.length;
        this.mCards.push(card);

        card.setParent(this);
        card.getDom().addClass('hand');

        var width = this.mCards.length * 110,
            start = this.parent.getDom().width() / 2 - width / 2,
            topPosition = this.getSide() === "down" ? 
                this.parent.getDom().height() - 70 :
                - 70;

        card.getDom().css({"top": topPosition, "left": start});

        this.mCards.forEach((cardCtrl) => {
            var $dom = cardCtrl.getDom();
            $dom.offset({"left": start + cardCtrl.getState().position * 105 + 5});
        });

    }

    onPlayCard (card) {
        this.mCards.splice(card.getState().position, 1);
        card.getDom().removeClass('hand');
    }

}