import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    description: "User's JWT access token",
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2MzIwNjIwNzMsImV4cCI6MTYzMjA2MjA3NH0.1',
  })
  accessToken!: string;
}
