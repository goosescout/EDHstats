import { ApiProperty } from '@nestjs/swagger';

export class CommanderBrief {
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
}
