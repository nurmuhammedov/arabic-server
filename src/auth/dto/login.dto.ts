import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: '12345678901234', description: 'TIN or PINFL of the user' })
  @IsString()
  @IsNotEmpty()
  readonly login!: string

  @ApiProperty({ example: 'secure_password!@', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password!: string
}
