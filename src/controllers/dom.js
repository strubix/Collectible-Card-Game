import $ from 'jquery-browserify';
import EventManager from '../eventManager';

class Dom extends EventManager {

    constructor(selector, parent = null) {
        super();

        this.$dom = $(selector);
        this.parent = parent;

        if (parent) {
            var p = parent;
            while (p.parent !== null) {
                p = p.parent;
            }
            this.root = p;
        } else {
            this.root = this;    
        }

        this.mState;

        this.side = "";

    }

    getSide () {
        if (this.side === "") {
            return this.parent.getSide();
        } else {
            return this.side;
        }
    }

    setState (state) {
        this.mState = state;
    }

    getState () {
        return this.mState;
    }

    setParent (parent) {
        this.parent = parent;
    }

    getParent () {
        return this.parent;
    }

    setDom (selector) {
        this.$dom = $(selector);
    }

    getDom () {
        return this.$dom;
    }
}

export default Dom;