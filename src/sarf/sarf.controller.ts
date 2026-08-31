import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CurrentUser } from '../common/decorators/current-user.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { RoleEnum } from '../common/enums/role.enum'
import { JwtPayload } from '../types/jwt-payload.type'
import { RootClassCode } from './enums/sarf.enum'
import { SarfService } from './sarf.service'

@ApiTags('Sarf')
@Controller('sarf')
@Roles(RoleEnum.STUDENT, RoleEnum.ADMIN)
export class SarfController {
  constructor(private readonly sarfService: SarfService) {}

  @Get('forms')
  @ApiOperation({ summary: 'The 22 abwab, in curriculum order' })
  listForms() {
    return this.sarfService.listForms()
  }

  @Get('forms/:code')
  @ApiOperation({ summary: 'One bab with real Quranic verbs built on it' })
  getForm(@Param('code') code: string) {
    return this.sarfService.getForm(code)
  }

  @Get('classes')
  @ApiOperation({ summary: 'The weak-root classes' })
  listClasses() {
    return this.sarfService.listClasses()
  }

  @Get('classes/:code')
  @ApiOperation({ summary: 'One root class with its most frequent roots' })
  getClass(@Param('code') code: RootClassCode) {
    return this.sarfService.getClass(code)
  }

  @Get('derive')
  @ApiOperation({ summary: 'A word the learner has not met, built from a root and template they know' })
  derive(@CurrentUser() user: JwtPayload) {
    return this.sarfService.getDerivation(user.id)
  }

  @Get('progress')
  @ApiOperation({ summary: 'How many verbs of each bab the learner knows' })
  progress(@CurrentUser() user: JwtPayload) {
    return this.sarfService.getProgress(user.id)
  }
}
