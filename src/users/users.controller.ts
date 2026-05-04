import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { RoleEnum } from '../common/enums/role.enum'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { AuthGuard } from '../common/guards/auth.guard'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish (Faqat Admin)' })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Foydalanuvchini ID bo‘yicha olish (Faqat Admin)' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish (Faqat Admin)' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto)
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Foydalanuvchini tahrirlash (Faqat Admin)' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateUserDto>) {
    return this.usersService.update(id, dto)
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish (Faqat Admin)' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
