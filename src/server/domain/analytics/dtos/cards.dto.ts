import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CardsDto {
  @ApiProperty({
    description: 'List of included cards',
    example: ["Mind's Desire", 'Brainstorm'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  included!: string[];

  @ApiProperty({
    description: 'List of excluded cards',
    example: ['Narset, Parter of Veils', 'Dockside Extortionist'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  excluded!: string[];
}
