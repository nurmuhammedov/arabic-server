import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { RolesGuard } from '../common/guards/roles.guard'
import { Region } from './entities/region.entity'
import { RegionsService } from './regions.service'

@ApiTags('Regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  findAll() {
    return this.regionsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get region by ID' })
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id)
  }

  @Post()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new region (Admin only)' })
  create(@Body() data: Partial<Region>) {
    return this.regionsService.create(data)
  }

  @Put(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update region (Admin only)' })
  update(@Param('id') id: string, @Body() data: Partial<Region>) {
    return this.regionsService.update(id, data)
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete region (Admin only)' })
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id)
  }
}
