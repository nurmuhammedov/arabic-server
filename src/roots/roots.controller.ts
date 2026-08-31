import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { RootsService } from './roots.service'

@ApiTags('Roots')
@Controller('roots')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class RootsController {
  constructor(private readonly rootsService: RootsService) {}

  @Get()
  @ApiOperation({ summary: 'Browse roots, most frequent first' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'onlyGlossed', required: false, type: Boolean })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('onlyGlossed') onlyGlossed?: string
  ) {
    return this.rootsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      onlyGlossed: onlyGlossed === 'true'
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'A root with every word derived from it' })
  findOne(@Param('id') id: string) {
    return this.rootsService.findOne(id)
  }
}
