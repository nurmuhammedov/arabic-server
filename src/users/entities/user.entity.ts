import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../common/entities/base.entity'
import { RoleEnum } from '../../common/enums/role.enum'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username!: string

  @Column({ type: 'varchar', nullable: false, select: false })
  password!: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string

  @Column({ name: 'full_name', type: 'varchar', nullable: false })
  fullName!: string

  @Column({ name: 'phone_number', type: 'varchar', nullable: false })
  phoneNumber!: string

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.STUDENT })
  role!: RoleEnum

  @Column({ name: 'region_id', type: 'uuid', nullable: false })
  regionId!: string

  @ApiProperty()
  @ManyToOne('Region', { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'region_id' })
  region!: any

  @Column({ name: 'district_id', type: 'uuid', nullable: false })
  districtId!: string

  @ApiProperty()
  @ManyToOne('District', { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'district_id' })
  district!: any
}
