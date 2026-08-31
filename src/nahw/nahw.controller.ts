import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { IrabCause } from './enums/nahw.enum'
import { NahwService } from './nahw.service'

@ApiTags('Nahw')
@Controller('nahw')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class NahwController {
  constructor(private readonly nahwService: NahwService) {}

  @Get('topics')
  @ApiOperation({ summary: 'The nahw curriculum, in order' })
  listTopics() {
    return this.nahwService.listTopics()
  }

  @Get('topics/:slug')
  @ApiOperation({ summary: 'One lesson with its example verse' })
  getTopic(@Param('slug') slug: string) {
    return this.nahwService.getTopic(slug)
  }

  @Get('irab')
  @ApiOperation({ summary: 'An irab challenge drawn from a real verse' })
  @ApiQuery({ name: 'cause', required: false, enum: IrabCause })
  @ApiQuery({ name: 'maxWords', required: false, type: Number })
  getChallenge(@Query('cause') cause?: IrabCause, @Query('maxWords') maxWords?: string) {
    return this.nahwService.getChallenge(cause, maxWords ? Number(maxWords) : undefined)
  }

  @Get('irab/causes')
  @ApiOperation({ summary: 'How many drill items exist for each cause' })
  getCauseCounts() {
    return this.nahwService.getCauseCounts()
  }
}
