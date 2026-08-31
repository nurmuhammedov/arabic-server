import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

import { RoleEnum } from '../../common/enums/role.enum'

export class CreateUserDto {
  @ApiProperty({ example: 'student01' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  username!: string

  @ApiProperty({ example: 'Passw0rd!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password!: string

  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  fullName!: string

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string

  @ApiProperty({ enum: RoleEnum, default: RoleEnum.STUDENT })
  @IsEnum(RoleEnum)
  role!: RoleEnum
}
