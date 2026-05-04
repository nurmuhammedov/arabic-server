import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

@Entity({ name: 'regions' })
export class Region extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name!: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  soato!: string

  @ApiProperty()
  @OneToMany('District', 'region')
  districts!: any[]
}
