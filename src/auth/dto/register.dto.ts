import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword!: string

  @ApiProperty()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  regionId!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  districtId!: string
}
