import { ApiProperty } from '@nestjs/swagger';

export class Card {
  @ApiProperty({
    description: 'Card name',
    example: "Mind's Desire",
  })
  name!: string;

  @ApiProperty({
    description: 'Card mana cost',
    example: '{4}{U}{U}',
  })
  manacost!: string;

  @ApiProperty({
    description: 'Card winrate',
    example: '0.5',
  })
  winrate!: number;

  @ApiProperty({
    description:
      'Card inclusion rate (portion of decks that include this card)',
    example: '0.5',
  })
  inclusionRate!: number;
}
