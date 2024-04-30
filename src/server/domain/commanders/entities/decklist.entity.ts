import { Card } from './card.entity';

export type Decklist = {
  id: string;
  format: string;
  commanders: {
    [name: string]: Card;
  };
  mainboard: {
    [name: string]: Card;
  };
};
