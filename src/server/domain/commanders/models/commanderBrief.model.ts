import { ApiProperty } from '@nestjs/swagger';

export class CommanderBrief {
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
}
