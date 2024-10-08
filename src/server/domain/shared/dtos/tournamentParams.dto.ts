import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsPositive, Min } from 'class-validator';

import { IsLessThanOrEqual } from '@server/infrastructure/validation/decorators/IsLessThanOrEqual.decorator';

const INT4_MAX = 2147483647;

export class TournamentParamsDto {
  @ApiProperty({
    description: 'Date after which the tournaments are included',
    type: 'string',
    example: '2024-04-29',
    required: false,
  })
  @IsDate({
    message: 'dateAfter must be a valid string Date representation',
  })
  @IsOptional()
  dateAfter: Date = new Date(0);

  @ApiProperty({
    description: 'The minimum number of players in the tournament',
    example: 8,
    required: false,
  })
  @IsLessThanOrEqual('sizeMax')
  @Min(0)
  @IsOptional()
  sizeMin: number = 0;

  @ApiProperty({
    description: 'The maximum number of players in the tournament',
    example: 32,
    required: false,
  })
  @Min(0)
  @IsOptional()
  sizeMax: number = INT4_MAX;

  @ApiProperty({
    description: 'The lowest place in the tournament standings to include',
    example: 4,
    required: false,
  })
  @IsPositive()
  @IsOptional()
  topCut: number = INT4_MAX;
}
