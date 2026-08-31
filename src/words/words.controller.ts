import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { JwtPayload } from '../types/jwt-payload.type'
import { CreateWordDto } from './dto/create-word.dto'
import { UpdateWordDto } from './dto/update-word.dto'
import { GlossStatus, WordSource } from './enums/word.enum'
import { WordsService } from './words.service'

@ApiTags('Words')
@Controller('words')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  @ApiOperation({ summary: 'Browse the dictionary' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'rootId', required: false })
  @ApiQuery({ name: 'patternId', required: false })
  @ApiQuery({ name: 'deckId', required: false })
  @ApiQuery({ name: 'glossStatus', required: false, enum: GlossStatus })
  @ApiQuery({ name: 'source', required: false, enum: WordSource })
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('rootId') rootId?: string,
    @Query('patternId') patternId?: string,
    @Query('deckId') deckId?: string,
    @Query('glossStatus') glossStatus?: GlossStatus,
    @Query('source') source?: WordSource
  ) {
    return this.wordsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
      rootId,
      patternId,
      deckId,
      glossStatus,
      source,
      ownerId: user.id
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'One word with its root family and Quranic occurrences' })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.wordsService.findOne(id, user.id)
  }

  @Post()
  @ApiOperation({ summary: 'Add a word — shared when an admin sends it, private for a student' })
  create(@Body() dto: CreateWordDto, @CurrentUser() user: JwtPayload) {
    return this.wordsService.create(dto, user)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a word; a student may only edit their own' })
  update(@Param('id') id: string, @Body() dto: UpdateWordDto, @CurrentUser() user: JwtPayload) {
    return this.wordsService.update(id, dto, user)
  }

  @Patch(':id/verify')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Mark a reviewed gloss as verified' })
  verify(@Param('id') id: string) {
    return this.wordsService.verify(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a word; Quranic entries are locked' })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.wordsService.remove(id, user)
  }
}
