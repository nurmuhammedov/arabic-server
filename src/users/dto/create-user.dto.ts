import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { RoleEnum } from '../../common/enums/role.enum'

export class CreateUserDto {
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

  @ApiProperty({ enum: RoleEnum, default: RoleEnum.STUDENT })
  @IsEnum(RoleEnum)
  role!: RoleEnum
}
