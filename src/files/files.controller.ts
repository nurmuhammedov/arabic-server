import {
  Body,
  Controller,
  Delete,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import * as fs from 'fs'
import { diskStorage } from 'multer'
import { extname, join } from 'path'

import { CurrentUser } from '../common/decorators/current-user.decorator'
import { t } from '../common/helpers/i18n.helper'
import { JwtPayload } from '../types/jwt-payload.type'
import { FilesService } from './files.service'

@ApiTags('Files Management')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new file (Image, PDF or Audio)' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'type',
    enum: ['IMAGE', 'PDF', 'AUDIO'],
    required: false,
    description: 'Specify the type of the uploaded file'
  })
  @ApiQuery({
    name: 'module',
    type: 'string',
    required: false,
    description: 'Optional module name for file organization (e.g., vocabulary)'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the file', example: 'word_image' },
        file: { type: 'string', format: 'binary', description: 'The file to be uploaded (Max size: 10MB)' }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: Request, _, cb) => {
          const moduleName = (req.query.module as string) || 'common'
          const now = new Date()
          const year = now.getFullYear().toString()
          const month = (now.getMonth() + 1).toString().padStart(2, '0')
          const day = now.getDate().toString().padStart(2, '0')
          const uploadPath = join('uploads', moduleName, year, month, day)
          fs.mkdirSync(uploadPath, { recursive: true })
          cb(null, uploadPath)
        },
        filename: (_, file, callback) => {
          const timestamp = Date.now()
          const fileExtName = extname(file.originalname)
          callback(null, `${timestamp}${fileExtName}`)
        }
      }),
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    })
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024,
            message: `File size must not exceed 10 MB!`
          })
        ]
      })
    )
    file: Express.Multer.File,
    @Body('name') name: string,
    @Query('type') type: 'IMAGE' | 'PDF' | 'AUDIO' = 'IMAGE',
    @CurrentUser() user: JwtPayload
  ) {
    if (!name) {
      name = file.originalname
    }

    const allowedMimeTypes = {
      IMAGE: /^image\/(jpeg|png|gif|webp)$/,
      PDF: /^application\/pdf$/,
      AUDIO: /^audio\/(mpeg|wav|ogg|mp3)$/
    }

    if (!allowedMimeTypes[type] || !allowedMimeTypes[type].test(file.mimetype)) {
      throw new UnsupportedMediaTypeException(
        t('common.file.invalid_type', `Invalid file format. Only ${type} is allowed!`, { args: { type } })
      )
    }

    return this.filesService.createFile(file, name, user.id)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specified file' })
  @ApiParam({ name: 'id', description: 'Unique UUID of the file to be deleted' })
  @ApiResponse({ status: 200, description: 'File successfully deleted' })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.filesService.remove(id, user.id)
  }
}
