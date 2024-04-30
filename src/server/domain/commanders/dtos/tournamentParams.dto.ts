import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

import { isLessThanOrEqual } from '~/server/infrastructure/validation/decorators/isLessThanOrEqual.decorator';

export class TournamentParamsDto {
  @ApiProperty({
    description:
      'Date after which the tournaments are included, in milliseconds',
    example: 1614589200000,
  })
  @IsDate()
  dateAfter!: number;

  @ApiProperty({
    description: 'The minimum number of players in the tournament',
    example: 8,
  })
  @isLessThanOrEqual('sizeMax', {
    message: 'Minimum size must be less than maximum size',
  })
  sizeMin!: number;

  @ApiProperty({
    description: 'The maximum number of players in the tournament',
    example: 32,
  })
  sizeMax!: number;

  @ApiProperty({
    description: 'The lowest place in the tournament standings to include',
    example: 4,
  })
  topCut!: number;
}
