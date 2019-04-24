/**
 * @file implement UserRepository
 */

//  Repository
import { IRepository } from './Repository';
import { Pool } from 'pg';

export type UserId = number;

export class User {
  id?: UserId;
  first_name: string;
  last_name: string;
  user_name: string;
  phone_number?: number;
  created_at?: Date;

  constructor(opts: Partial<User>) {
    this.id = opts.id;
    this.first_name = opts.first_name;
    this.last_name = opts.last_name;
    this.user_name = opts.user_name;
    this.phone_number = opts.phone_number;
    this.created_at = opts.created_at;
  }
}

export class UserRepository implements IRepository<UserId, User> {
  constructor(public pool: Pool) { }
  async save(user: Partial<User>): Promise<User> {
    try {
      const res = await this.pool.query(
        `
            INSERT INTO "user" (
              first_name,
              last_name,
              user_name,
              phone_number
            ) VALUES ($1, $2, $3, $4)
            RETURNING *
          `,
        [
          user.first_name,
          user.last_name,
          user.user_name,
          user.phone_number
        ],
      );
      const newUser = new User(res.rows[0]);
      console.log(`UserRepository.ts @ save(): newUser = ${newUser}`);
      return newUser;
    } catch (err) {
      console.log(`UserRepository.ts @ save(): Could not create user >> ${err.message}`);
      throw `Could not create user (${err})`;
    }
  }
  // TEMPORARY: Seeding DB
  async seed() {
    await this.pool.query(
      `
      INSERT INTO "user" (id, first_name, last_name, phone_number)
      VALUES (1, 'Super', 'Admin', 'superadmin@example.com', 1, 77, 'blue', 'WORKING', 'Superadmin', $1)
      ON CONFLICT DO NOTHING;
    `,
    );

    // advance the auto-incrementing sequence by one. This avoids the
    // problem that the next (very first!) User to be added will clash
    // with the existing seeded value.
    await this.pool.query(`SELECT nextval('user_id_seq');`);
  }

}
