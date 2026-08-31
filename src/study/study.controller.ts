import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { JwtPayload } from '../types/jwt-payload.type'
import { AddDeckDto, AnswerDto, SessionQueryDto } from './dto/study.dto'
import { CardState } from './enums/study.enum'
import { StudyService } from './study.service'

@ApiTags('Study')
@Controller('study')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Get('session')
  @ApiOperation({ summary: 'Cards to review right now, due first then new' })
  session(@Query() query: SessionQueryDto, @CurrentUser() user: JwtPayload) {
    return this.studyService.getSession(user.id, query.deckId, query.limit ?? 20)
  }

  @Post('answer')
  @ApiOperation({ summary: 'Grade a card and get its next schedule' })
  answer(@Body() dto: AnswerDto, @CurrentUser() user: JwtPayload) {
    return this.studyService.answer(user.id, dto)
  }

  @Get('stats')
  @ApiOperation({ summary: 'Progress, including how much of the Quran the learner now knows' })
  stats(@CurrentUser() user: JwtPayload) {
    return this.studyService.getStats(user.id)
  }

  @Get('cards')
  @ApiOperation({ summary: 'Words the learner has already met' })
  cards(
    @CurrentUser() user: JwtPayload,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('state') state?: CardState
  ) {
    return this.studyService.listCards(user.id, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      state
    })
  }

  @Get('decks')
  @ApiOperation({ summary: 'Decks the learner is working through' })
  decks(@CurrentUser() user: JwtPayload) {
    return this.studyService.listDecks(user.id)
  }

  @Post('decks')
  @ApiOperation({ summary: 'Start working through a deck' })
  addDeck(@Body() dto: AddDeckDto, @CurrentUser() user: JwtPayload) {
    return this.studyService.addDeck(user.id, dto)
  }

  @Delete('decks/:deckId')
  @ApiOperation({ summary: 'Stop working through a deck' })
  removeDeck(@Param('deckId') deckId: string, @CurrentUser() user: JwtPayload) {
    return this.studyService.removeDeck(user.id, deckId)
  }

  @Patch('cards/:wordId/suspend')
  @ApiOperation({ summary: 'Pause or resume a word' })
  suspend(@Param('wordId') wordId: string, @Body('suspended') suspended: boolean, @CurrentUser() user: JwtPayload) {
    return this.studyService.suspend(user.id, wordId, suspended)
  }
}
