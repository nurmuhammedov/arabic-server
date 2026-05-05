import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { JwtPayload } from '../types/jwt-payload.type'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto'
import { VocabularyService } from './vocabulary.service'

@ApiTags('Vocabulary Management')
@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Get()
  @Roles(RoleEnum.STUDENT)
  @ApiOperation({ summary: 'Get all vocabulary items for the current student' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'arabic', required: false, type: String })
  @ApiQuery({ name: 'uzbek', required: false, type: String })
  @ApiQuery({ name: 'russian', required: false, type: String })
  @ApiQuery({ name: 'english', required: false, type: String })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('arabic') arabic?: string,
    @Query('uzbek') uzbek?: string,
    @Query('russian') russian?: string,
    @Query('english') english?: string,
    @CurrentUser() user?: JwtPayload
  ) {
    return this.vocabularyService.findAll({
      page,
      limit,
      search,
      createdBy: user!.id,
      status,
      arabic,
      uzbek,
      russian,
      english
    })
  }

  @Get(':id')
  @Roles(RoleEnum.STUDENT)
  @ApiOperation({ summary: 'Get a specific vocabulary item' })
  findOne(@Param('id') id: string, @CurrentUser() user?: JwtPayload) {
    return this.vocabularyService.findOne(id, user!.id)
  }

  @Post()
  @Roles(RoleEnum.STUDENT)
  @ApiOperation({ summary: 'Create a new vocabulary item' })
  create(@Body() dto: CreateVocabularyDto, @CurrentUser() user?: JwtPayload) {
    return this.vocabularyService.create(dto, user!.id)
  }

  @Put(':id')
  @Roles(RoleEnum.STUDENT)
  @ApiOperation({ summary: 'Update a vocabulary item' })
  update(@Param('id') id: string, @Body() dto: UpdateVocabularyDto, @CurrentUser() user?: JwtPayload) {
    return this.vocabularyService.update(id, dto, user!.id)
  }

  @Delete(':id')
  @Roles(RoleEnum.STUDENT)
  @ApiOperation({ summary: 'Delete a vocabulary item' })
  remove(@Param('id') id: string, @CurrentUser() user?: JwtPayload) {
    return this.vocabularyService.remove(id, user!.id)
  }
}
