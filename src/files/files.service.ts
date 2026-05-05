import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs/promises'
import * as path from 'path'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { File } from './entities/file.entity'

export interface FormattedFileResponse {
  id: string
  name: string
  path: string
  size: number
}

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  async createFile(file: Express.Multer.File, name: string, userId: string): Promise<FormattedFileResponse> {
    const fileToCreate = this.fileRepository.create({
      name,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      userId
    })

    const createdFile = await this.fileRepository.save(fileToCreate)

    return this.formatFileResponse(createdFile)
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const file = await this.fileRepository.findOne({ where: { id } })
    if (!file) {
      throw new NotFoundException(t('common.file.not_found', 'File not found!'))
    }
    if (file.userId !== userId) {
      throw new ForbiddenException(t('common.auth.unauthorized', 'You are not allowed to delete this file'))
    }

    try {
      const filePath = path.join(process.cwd(), file.path)
      await fs.unlink(filePath)
    } catch (error) {
      console.error(`Failed to delete file from disk: ${file.path}`, error)
    }

    await this.fileRepository.remove(file)

    return { message: t('common.file.deleted', `File with ID #${id} has been deleted.`) }
  }

  async forceRemoveFileById(id: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } })
    if (file) {
      try {
        const fullPath = path.join(process.cwd(), file.path)
        await fs.unlink(fullPath).catch(() => null)
        await this.fileRepository.remove(file)
      } catch (error) {
        console.error(`Failed to force delete file: ${file.path}`, error)
      }
    }
  }

  private formatFileResponse(file: File): FormattedFileResponse {
    if (!file) {
      throw new NotFoundException(t('common.file.not_found', 'File not found!'))
    }

    const domain = process.env.DOMAIN || 'http://localhost:8080'
    return {
      id: file.id,
      name: file.name,
      path: `${domain}/${file.path.replace(/\\/g, '/')}`,
      size: Number(file.size)
    }
  }
}
