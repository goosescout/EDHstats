import { ApiProperty } from '@nestjs/swagger';

export class CommanderStats {
  @ApiProperty({
    description: "Commander's winrate",
    example: 0.5,
  })
  winrate!: number;

  @ApiProperty({
    description: "Commander's drawrate",
    example: 0.1,
  })
  drawrate!: number;

  @ApiProperty({
    description: "Commander's played decks",
    example: 100,
  })
  decks!: number;
}
