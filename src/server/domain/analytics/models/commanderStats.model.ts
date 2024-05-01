import { ApiProperty } from '@nestjs/swagger';

export class CommanderStats {
  @ApiProperty({
    description: 'Commander winrate',
    example: 0.5,
  })
  winrate!: number;

  @ApiProperty({
    description: 'Commander drawrate',
    example: 0.1,
  })
  drawrate!: number;

  @ApiProperty({
    description: 'Commander played decks',
    example: 100,
  })
  decks!: number;
}
