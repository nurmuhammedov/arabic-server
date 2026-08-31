import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { JwtPayload } from '../types/jwt-payload.type'
import { DecksService } from './decks.service'
import { DeckType } from './enums/deck-type.enum'

@ApiTags('Decks')
@Controller('decks')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  @ApiOperation({ summary: 'Decks the learner can start' })
  @ApiQuery({ name: 'type', required: false, enum: DeckType })
  findAll(@CurrentUser() user: JwtPayload, @Query('type') type?: DeckType) {
    return this.decksService.findAll(user.id, type)
  }

  @Get(':id')
  @ApiOperation({ summary: 'One deck' })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.decksService.findOne(id, user.id)
  }
}
