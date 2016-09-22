import Controller from './dom';

export default class CemeteryController extends Controller {
    constructor (selector, parent) {
        super(selector, parent);

        this.parent.on('discardCard', this.onDiscardCard.bind(this));

    }

    onDiscardCard (card) {
        card.getDom().offset(this.$dom.offset());
        card.setParent(this);
        card.getDom().removeClass('flip');
    }
}