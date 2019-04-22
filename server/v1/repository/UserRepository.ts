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
  email: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(opts: Partial<User>) {
    this.id = opts.id;
    this.first_name = opts.first_name;
    this.last_name = opts.last_name;
    this.email = opts.email;
    this.phone = opts.phone;
    this.created_at = opts.created_at;
    this.updated_at = opts.updated_at;
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
              email,
              phone,
            ) VALUES ($1, $2, $3, $4)
            RETURNING *
          `,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.phone,
        ],
      );

      const newUser = new User(res.rows[0]);
      console.log({
        level: 'info',
        message: `UserRepository.ts @ save(): newUser = ${newUser}`,
      });
      return newUser;
    } catch (err) {
      console.log({
        level: 'error',
        message: `UserRepository.ts @ save(): Could not create user >> ${
          err.message
          }`,
      });
      throw `Could not create user (${err})`;
    }
  }

}
