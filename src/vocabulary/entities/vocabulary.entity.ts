import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { File } from '../../files/entities/file.entity'
import { VocabularyStatus } from '../enums/vocabulary-status.enum'

@Entity({ name: 'vocabulary' })
export class Vocabulary extends BaseEntity {
  @Column({ type: 'varchar' })
  arabic!: string

  @Column({ name: 'transcription_ar', type: 'varchar', nullable: true })
  transcriptionAr?: string

  @Column({ type: 'varchar' })
  uzbek!: string

  @Column({ type: 'varchar', nullable: true })
  russian?: string

  @Column({ type: 'varchar', nullable: true })
  english?: string

  @Column({ name: 'transcription_en', type: 'varchar', nullable: true })
  transcriptionEn?: string

  @ManyToMany(() => File)
  @JoinTable({
    name: 'vocabulary_images',
    joinColumn: { name: 'vocabulary_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' }
  })
  images?: File[]

  @ManyToMany(() => File)
  @JoinTable({
    name: 'vocabulary_files',
    joinColumn: { name: 'vocabulary_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' }
  })
  files?: File[]

  @Column({ type: 'enum', enum: VocabularyStatus, default: VocabularyStatus.NEW })
  status!: VocabularyStatus

  @Column({ type: 'text', nullable: true })
  description?: string
}
