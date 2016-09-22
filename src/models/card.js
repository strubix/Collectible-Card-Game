import Pawn from './pawn';

class Card extends Pawn {
  constructor(config) {
    super(config);
    this.face = config.face;
  }
}
export default Card;