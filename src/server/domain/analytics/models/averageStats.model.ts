import { ApiProperty } from '@nestjs/swagger';

export class AverageStats {
  @ApiProperty({
    description: 'Average winrate of all commanders',
    example: 0.5,
  })
  winrate!: number;

  @ApiProperty({
    description: 'Average drawrate of all commanders',
    example: 0.1,
  })
  drawrate!: number;
}
