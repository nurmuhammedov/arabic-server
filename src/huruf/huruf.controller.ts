import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { ParticleCategory } from './enums/huruf.enum'
import { HurufService } from './huruf.service'

@ApiTags('Huruf')
@Controller('huruf')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class HurufController {
  constructor(private readonly hurufService: HurufService) {}

  @Get()
  @ApiOperation({ summary: 'Function words, most frequent first' })
  @ApiQuery({ name: 'category', required: false, enum: ParticleCategory })
  findAll(@Query('category') category?: ParticleCategory) {
    return this.hurufService.findAll(category)
  }

  @Get('by-category')
  @ApiOperation({ summary: 'Function words grouped by what they do' })
  byCategory() {
    return this.hurufService.byCategory()
  }

  @Get(':id')
  @ApiOperation({ summary: 'One particle with its example verse' })
  findOne(@Param('id') id: string) {
    return this.hurufService.findOne(id)
  }
}
