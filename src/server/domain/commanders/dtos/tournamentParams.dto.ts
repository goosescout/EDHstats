import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsPositive, Min } from 'class-validator';

import { isLessThanOrEqual } from '~/server/infrastructure/validation/decorators/isLessThanOrEqual.decorator';

export class TournamentParamsDto {
  @ApiProperty({
    description:
      'Timestamp (number) or Date (string) after which the tournaments are included, in milliseconds',
    oneOf: [
      { type: 'string', example: '2024-04-29' },
      { type: 'number', example: 1670000000000 },
    ],
  })
  @IsDate({
    message:
      'dateAfter must be a valid timestamp or string Date representation',
  })
  @Transform(({ value }) => new Date(value))
  dateAfter!: number | string;

  @ApiProperty({
    description: 'The minimum number of players in the tournament',
    example: 8,
  })
  @isLessThanOrEqual('sizeMax')
  @IsInt()
  @Min(0)
  sizeMin!: number;

  @ApiProperty({
    description: 'The maximum number of players in the tournament',
    example: 32,
  })
  @IsInt()
  @Min(0)
  sizeMax!: number;

  @ApiProperty({
    description: 'The lowest place in the tournament standings to include',
    example: 4,
  })
  @IsInt()
  @IsPositive()
  topCut!: number;
}
