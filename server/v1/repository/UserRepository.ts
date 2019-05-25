/**
 * @file implement UserRepository
 */

//  Repository
import { IUserRepository } from './Repository';
import { Pool } from 'pg';
import createLogger from '../winston';
import { encryptPassword, comparePassword, createToken } from '../util';
import { Response } from 'express';
import { jwt } from 'jsonwebToken';

export type UserId = number;
export type Status = {
  statusCode: number,
  message: string
}
export class User {
  id: UserId;
  first_name: string;
  last_name: string;
  user_name: string;
  phone_number?: number;
  created_at?: Date;
  email?: string;
  password?: string;
  statusCode?: number;
  message?: string;

  constructor(opts: Partial<User>) {
    this.id = opts.id;
    this.first_name = opts.first_name;
    this.last_name = opts.last_name;
    this.user_name = opts.user_name;
    this.phone_number = opts.phone_number;
    this.created_at = opts.created_at;
    this.email = opts.email;
    this.password = opts.password;
  }
}

export class UserRepository implements IUserRepository<UserId, User> {
  constructor(public pool: Pool) { }

  /**
   * @method userExists
   * @description method to return friendly error when email, username and phone_number already exist
   * @param {String} response 
   */
  userExists(err: string) {
    const stringifyError = err.toString();
    if (stringifyError.includes('duplicate key') && stringifyError.includes('user_')) {
      const userKey = (/user_\w+/.exec(stringifyError));
      const replaceReg = /user_|_key/gi
      throw `${userKey[0].replace(replaceReg, '')} already exist`
    }
  }

  /**
   * @method successResponse
   * @param user 
   */
  async successResponse(user: User, res, status: Status) {
    const { first_name, last_name, user_name, phone_number, email } = user;
    const decodeCredentials = {
      token: {
        user_name,
        email,
        phone_number
      }
    }
    const token = await createToken(decodeCredentials)
    const { statusCode, message } = status
    const newUser = new User({
      first_name,
      last_name,
      user_name,
      phone_number,
      email
    });
    createLogger.log({
      level: 'info',
      message: `UserRepository.ts @ save(): newUser = ${newUser}`,
    });
    return res.status(statusCode).json({
      statusCode: `${statusCode}`,
      message,
      data: newUser,
      token
    })
  }

  /**
   * @method save
   * @description method to sign up a user
   * @param {Object} user - first_name: string, last_name: string, user_name: string, phone_number: string, email: string, password: string
   */
  async save(user): Promise<User> {
    const { first_name, last_name, user_name, phone_number, email, password, response } = user
    const queryString = {
      text: 'INSERT INTO "user"(first_name, last_name, user_name, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *;',
      values: [first_name, last_name, user_name, phone_number, email, encryptPassword(password)],
    }
    try {
      const res = await this.pool.query(queryString);
      const status = {
        statusCode: 201,
        message: 'Sign up successful'
      }
      return this.successResponse(res.rows[0], response, status)
    } catch (err) {
      this.userExists(err);
      createLogger.log({
        level: 'info',
        message: `UserRepository.ts @ save(): Could not create user >> ${
          err
          }`,
      });
      throw `Could not create user (${err})`;
    }
  }

  async get(conditions = {}) {
    let client;
    try {
      client = await this.pool.connect();
      let q = 'SELECT * FROM "user" WHERE 1 = 1';
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      const res = await this.pool.query(q);
      return res.rows.map(user => new User(user));
    } catch (err) {
      throw `Could not query Users (${err}), ${JSON.stringify(conditions)}`;
    } finally {
      if (client) client.release();
    }
  }

  /**
   * @function getOne
   * @description logs in a user by email or username
   * @param {Object} email - user_name: string, email: string, password: string, response: Response
   */
  async getOne(user) {
    const { user_name, email, password, response } = user
    let result;
    const credential = user_name ? { user_name } : email ? { email } : ''
    try {
      result = await this.get(credential);
      if (!result[0]) {
        return {
          statusCode: 404,
          message: `The email or username does not exist`,
        };
      }
      const validate_password = comparePassword(password, result[0].password)
      if (!validate_password) {
        return {
          statusCode: 400,
          message: `Your email/username or password is not valid`,
        };
      }
      const status = {
        statusCode: 200,
        message: 'User logged in successfully',
      }
      return this.successResponse(result[0], response, status)
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

}
