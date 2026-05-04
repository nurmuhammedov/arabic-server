import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { RolesGuard } from '../common/guards/roles.guard'
import { DistrictsService } from './districts.service'
import { District } from './entities/district.entity'

@ApiTags('Districts')
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all districts (with regionId filter)' })
  findAll(@Query('regionId') regionId?: string) {
    return this.districtsService.findAll(regionId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get district by ID' })
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(id)
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new district (Admin only)' })
  create(@Body() data: Partial<District>) {
    return this.districtsService.create(data)
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update district (Admin only)' })
  update(@Param('id') id: string, @Body() data: Partial<District>) {
    return this.districtsService.update(id, data)
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete district (Admin only)' })
  remove(@Param('id') id: string) {
    return this.districtsService.remove(id)
  }
}
