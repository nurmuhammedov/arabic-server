import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { PatternCategory } from './enums/pattern-category.enum'
import { PatternsService } from './patterns.service'

@ApiTags('Patterns')
@Controller('patterns')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class PatternsController {
  constructor(private readonly patternsService: PatternsService) {}

  @Get('families')
  @ApiOperation({ summary: 'Template families with their share of the Quran' })
  listFamilies() {
    return this.patternsService.listFamilies()
  }

  @Get('drill')
  @ApiOperation({ summary: 'A real Quranic word; pick what its template does' })
  @ApiQuery({ name: 'category', required: false, enum: PatternCategory })
  drill(@Query('category') category?: PatternCategory) {
    return this.patternsService.drill(category)
  }

  @Get()
  @ApiOperation({ summary: 'Described templates, heaviest first' })
  @ApiQuery({ name: 'category', required: false, enum: PatternCategory })
  listPatterns(@Query('category') category?: PatternCategory) {
    return this.patternsService.listPatterns(category)
  }

  @Get(':id')
  @ApiOperation({ summary: 'One template with the Quranic words built on it' })
  getPattern(@Param('id') id: string) {
    return this.patternsService.getPattern(id)
  }
}
