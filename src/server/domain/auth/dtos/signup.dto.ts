import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'Username',
    example: 'Mark Rosewater',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    description: 'Password',
    example: 'StRoNgPaSsWoRd123!',
  })
  @IsString()
  password!: string;
}
