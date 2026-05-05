import { Exclude, Expose, Transform } from 'class-transformer'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

@Entity({ name: 'files' })
@Exclude()
export class File extends BaseEntity {
  @Column({ type: 'varchar' })
  @Expose()
  name!: string

  @Column({ type: 'varchar' })
  @Expose()
  @Transform(({ value }) => {
    if (!value) return value
    const domain = (process.env.BASE_URL || 'http://localhost:8080').replace(/\/$/, '')
    const normalizedPath = value.replace(/\\/g, '/').replace(/^\//, '')
    return `${domain}/${normalizedPath}`
  })
  path!: string

  @Column({ type: 'varchar' })
  @Expose()
  mimetype!: string

  @Column({ type: 'bigint' })
  @Expose()
  size!: number

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string
}
