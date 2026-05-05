import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date

  @Column({ name: 'created_by', type: 'uuid', nullable: true, select: false })
  createdBy?: string

  @Column({ name: 'updated_by', type: 'uuid', nullable: true, select: false })
  updatedBy?: string
}
