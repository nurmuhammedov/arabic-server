import { RoleEnum } from '../../common/enums/role.enum'
import { User } from '../../users/entities/user.entity'
import { dataSource } from '../data-source'

/**
 * Promotes an existing account to ADMIN. Registration always creates a student,
 * so the first administrator has to be raised by hand after signing up.
 */
const run = async () => {
  const username = process.argv[2]
  if (!username) {
    console.error('Usage: pnpm run make-admin <username>')
    process.exit(1)
  }

  const ds = await dataSource.initialize()
  const repo = ds.getRepository(User)

  const user = await repo.findOne({ where: { username } })
  if (!user) {
    console.error(`No account named "${username}".`)
    await ds.destroy()
    process.exit(1)
  }

  user.role = RoleEnum.ADMIN
  await repo.save(user)
  console.log(`${username} is now an ADMIN.`)

  await ds.destroy()
}

void run()
