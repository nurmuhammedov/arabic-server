import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { RoleEnum } from '../../common/enums/role.enum'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30 })
  username!: string

  @Column({ type: 'varchar', select: false })
  password!: string

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 254 })
  email!: string

  @Column({ name: 'full_name', type: 'varchar', length: 150 })
  fullName!: string

  @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string

  @Index()
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.STUDENT })
  role!: RoleEnum

  @Column({ name: 'daily_new_limit', type: 'smallint', default: 10 })
  dailyNewLimit!: number

  @Column({ name: 'daily_review_limit', type: 'smallint', default: 120 })
  dailyReviewLimit!: number

  /** Which glosses to reveal on the answer side, e.g. ['uz', 'ru', 'en']. */
  @Column({ name: 'answer_languages', type: 'varchar', array: true, default: () => `'{uz,ru,en}'` })
  answerLanguages!: string[]

  @Column({ type: 'varchar', length: 64, default: 'Asia/Tashkent' })
  timezone!: string
}
