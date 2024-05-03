import { ApiProperty } from '@nestjs/swagger';

export class Commander {
  @ApiProperty({
    description: "Commander's name",
    example: 'Kess, Dissident Mage',
  })
  name!: string;

  @ApiProperty({
    description: "Commander's color identity",
    example: 'UBR',
  })
  identity!: string;

  @ApiProperty({
    description: "Commander's winrate",
    example: 0.65,
  })
  winrate!: number;

  @ApiProperty({
    description: "Commander's drawrate",
    example: 0.1,
  })
  drawrate!: number;

  @ApiProperty({
    description: "Commander's deck count",
    example: 10,
  })
  decks!: number;

  @ApiProperty({
    description: "Commander's autoincludes count",
    example: 50,
  })
  autoincludes!: number;

  @ApiProperty({
    description: "Commander's unique cards count",
    example: 100,
  })
  unique!: number;

  @ApiProperty({
    description: "Commander's average price",
    example: 100,
  })
  avgPrice!: number;
}
