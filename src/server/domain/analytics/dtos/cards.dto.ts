import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CardsDto {
  @ApiProperty({
    description: 'List of included cards',
    example: ["Mind's Desire", 'Brainstorm'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  included!: string[];

  @ApiProperty({
    description: 'List of excluded cards',
    example: ['Narset, Parter of Veils', 'Dockside Extortionist'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  excluded!: string[];
}
