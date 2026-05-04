import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { RoleEnum } from '../common/enums/role.enum'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'
import { DistrictsService } from './districts.service'
import { District } from './entities/district.entity'

@ApiTags('Districts')
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha tumanlarni olish (viloyat IDsi bo‘yicha filtr bilan)' })
  findAll(@Query('regionId') regionId?: string) {
    return this.districtsService.findAll(regionId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Tumanni ID bo‘yicha olish' })
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(id)
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Yangi tuman yaratish (Faqat Admin)' })
  create(@Body() data: Partial<District>) {
    return this.districtsService.create(data)
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Tumanni tahrirlash (Faqat Admin)' })
  update(@Param('id') id: string, @Body() data: Partial<District>) {
    return this.districtsService.update(id, data)
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Tumanni o‘chirish (Faqat Admin)' })
  remove(@Param('id') id: string) {
    return this.districtsService.remove(id)
  }
}
