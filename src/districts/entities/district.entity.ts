import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

@Entity({ name: 'districts' })
export class District extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name!: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  soato!: string

  @Column({ name: 'region_id', type: 'uuid', nullable: false })
  regionId!: string

  @ApiProperty()
  @ManyToOne('Region', 'districts', { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'region_id' })
  region!: any
}
