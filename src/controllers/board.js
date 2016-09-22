import Controller from './dom';

export default class BoardController extends Controller {
    constructor (selector, parent) {
        super(selector, parent);

        this.mCards = [];
        this.mActiveCard = null;
        
        this.on('clickCard', this.onClickCard.bind(this));

        this.parent.on('playCard', this.onPlayCard.bind(this));
        this.parent.on('activateCard', this.onActivateCard.bind(this));
        this.parent.on('targetCard', this.onTargetCard.bind(this));
        this.parent.on('attackCard', this.onAttack.bind(this));
        this.parent.on('attackHand', this.onAttack.bind(this));

        this.parent.on('discardCard', this.onDiscardCard.bind(this));

    }

    onClickCard (card) {
        this.parent.trigger('clickBoard', card);
    }

    onPlayCard (card) {
        var self = this,
            state = card.getState();

        state.position = this.mCards.length;
        this.mCards.push(card);

        var width = this.mCards.length * 110,
            start = this.parent.getDom().width() / 2 - width / 2;

        card.setParent(this);
        card.getDom().addClass('board');

        card.getDom().on('transitionend', function te () {
            var $this = $(this);

            $this.off('transitionend', te);

            card.getDom().css({"top": self.parent.getDom().height() / 2 - 70});

            self.mCards.forEach((cardCtrl) => {
                var $dom = cardCtrl.getDom();
                $dom.offset({"left": start + cardCtrl.getState().position * 105 + 5});
            });

            $this.removeClass('play');
        });
        
        card.getDom().addClass('play');

        if (this.getSide() === "up") {
            card.getDom().addClass('flip');
        }

    }

    onActivateCard (card) {
        this.mActiveCard = card;
        card.getDom().addClass('active');
    }

    onTargetCard (card) {
        card.getDom().addClass('target');
        var intervalCount = 0,
            i = setInterval(function () {
                intervalCount++;
                if (intervalCount == 1) {
                    card.getDom().addClass("hit");
                    card.getDom().removeClass("target");
                } else {
                    card.getDom().removeClass("hit");
                    clearInterval(i);
                }
            }, 1500);
    }

    onAttack (target) {
        var initOffset = this.mActiveCard.getDom().offset(),
            targetOffset = target.domTarget !== undefined ? target.domTarget.offset() : target.getDom().offset();

        if (this.getSide() === "down") {
            targetOffset.top += 20;
            targetOffset.left += 70;
        } else {
            targetOffset.top -= 20;
            targetOffset.left -= 70;
        }

        var activeCardDom = this.mActiveCard.getDom();
        activeCardDom.on('transitionend', function te () {
            var $this = $(this);
            $this.off('transitionend', te);
            $this.offset(initOffset);
            activeCardDom.removeClass('attack');
        });
        activeCardDom.addClass('attack');
        activeCardDom.removeClass('active');
        activeCardDom.offset(targetOffset);
    }

    onDiscardCard (card) {
        this.mCards.splice(card.getState().position, 1);
        card.getDom().removeClass('board');        
    }

}