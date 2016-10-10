import GameModel from './game';
import DeckModel from './deck';
import PlayerModel from './player';
import Card from './card';
import CemetaryModel from './cemetary';
import HandModel from './hand';
import BoardModel from './board';

export default {
  game: {
    class: GameModel,
    param: {}
  },
  deck: {
    class: DeckModel,
    param: {cards : [new Card({ life: 4, strength: 2, def: 3, face: 'card-1' }), new Card({ life: 6, strength: 2, def: 1, face: 'card-2' }), new Card({ life: 6, strength: 2, def: 1, face: 'card-2' })]}
  },
  player: {
    class: PlayerModel,
    param: {}
  },
  cemetary: {
    class: CemetaryModel,
    param: {}
  },
  hand: {
    class: HandModel,
    param: {}
  },
  board: {
    class: BoardModel,
    param: {}
  }
}