import { ApiProperty } from '@nestjs/swagger';

export class Commander {
  @ApiProperty({
    description: 'Commander name',
    example: 'Kess, Dissident Mage',
  })
  name!: string;

  @ApiProperty({
    description: 'Commander color identity',
    example: 'UBR',
  })
  identity!: string;

  @ApiProperty({
    description: 'Commander winrate',
    example: 0.65,
  })
  winrate!: number;

  @ApiProperty({
    description: 'Commander drawrate',
    example: 0.1,
  })
  drawrate!: number;

  @ApiProperty({
    description: 'Commander deck count',
    example: 10,
  })
  decks!: number;

  @ApiProperty({
    description: 'Commander autoincludes count',
    example: 50,
  })
  autoincludes!: number;

  @ApiProperty({
    description: 'Commander unique cards count',
    example: 100,
  })
  unique!: number;

  @ApiProperty({
    description: 'Commander average price',
    example: 100,
  })
  avgPrice!: number;
}
