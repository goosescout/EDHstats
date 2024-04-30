import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsPositive, Min } from 'class-validator';

import { isLessThanOrEqual } from '~/server/infrastructure/validation/decorators/isLessThanOrEqual.decorator';

export class TournamentParamsDto {
  @ApiProperty({
    description:
      'Date after which the tournaments are included, in milliseconds',
    type: 'string',
    example: '2024-04-29',
    required: false,
  })
  @IsDate({
    message: 'dateAfter must be a valid string Date representation',
  })
  dateAfter: Date = new Date(0);

  @ApiProperty({
    description: 'The minimum number of players in the tournament',
    example: 8,
    required: false,
  })
  @isLessThanOrEqual('sizeMax')
  @Min(0)
  sizeMin: number = 0;

  @ApiProperty({
    description: 'The maximum number of players in the tournament',
    example: 32,
    required: false,
  })
  @Min(0)
  sizeMax: number = Number.MAX_SAFE_INTEGER;

  @ApiProperty({
    description: 'The lowest place in the tournament standings to include',
    example: 4,
    required: false,
  })
  @IsPositive()
  topCut: number = Number.MAX_SAFE_INTEGER;
}
