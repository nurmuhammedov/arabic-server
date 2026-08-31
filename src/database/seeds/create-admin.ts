import * as bcrypt from 'bcrypt'

import { RoleEnum } from '../../common/enums/role.enum'
import { User } from '../../users/entities/user.entity'
import { dataSource } from '../data-source'

/**
 * Development fixture. Registration always creates a student, so the first
 * administrator is made here. Pass a username and password to override the
 * defaults; never run this against a deployed database.
 */
const run = async () => {
  const username = process.argv[2] ?? 'admin'
  const password = process.argv[3] ?? 'Admin@12345'

  const ds = await dataSource.initialize()
  const repo = ds.getRepository(User)

  const existing = await repo.findOne({ where: { username } })
  const user =
    existing ??
    repo.create({
      username,
      email: `${username}@example.com`,
      fullName: 'Administrator'
    })

  user.role = RoleEnum.ADMIN
  user.password = await bcrypt.hash(password, 10)
  await repo.save(user)

  console.log(`${existing ? 'Updated' : 'Created'} admin "${username}".`)
  console.log('Change this password before the project leaves your machine.')

  await ds.destroy()
}

void run()
