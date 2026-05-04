import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { RoleEnum } from '../common/enums/role.enum'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { RegionsService } from './regions.service'
import { Region } from './entities/region.entity'

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha viloyatlarni olish' })
  findAll() {
    return this.regionsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Viloyatni ID bo‘yicha olish' })
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id)
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Yangi viloyat yaratish (Faqat Admin)' })
  create(@Body() data: Partial<Region>) {
    return this.regionsService.create(data)
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Viloyatni tahrirlash (Faqat Admin)' })
  update(@Param('id') id: string, @Body() data: Partial<Region>) {
    return this.regionsService.update(id, data)
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Viloyatni o‘chirish (Faqat Admin)' })
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id)
  }
}
