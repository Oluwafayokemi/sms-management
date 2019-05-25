
import { IMessageRepository } from './Repository';
import { Pool } from 'pg';
import createLogger from '../winston';
import { Response } from 'express-serve-static-core';
import { User } from './UserRepository';

export type MessageId = number;
export type Status = {
  statusCode: number,
  message: string
}
export type User = {
  email: string,
  user_name: string
}
export class Message {
  id: MessageId;
  body: String;
  to_user: String;
  from_user: String;
  sms_status: String;
  token: {
    user_name: String;
  };

  constructor(opts: Partial<Message>) {
    this.id = opts.id;
    this.body = opts.body;
    this.to_user = opts.to_user;
    this.from_user = opts.from_user;
    this.sms_status = opts.sms_status;
    this.token = opts.token;
  }
}
export class MessageRepository implements IMessageRepository<MessageId, Message> {
  constructor(public pool: Pool) { }

  /**
  * @method successResponse
  * @param user 
  */
  successResponse(sms: Message, res, status: Status) {
    const { body, from_user, to_user, sms_status } = sms;
    const { statusCode, message } = status
    createLogger.log({
      level: 'info',
      message: `UserRepository.ts @ save(): newUser = ${sms}`,
    });
    return res.json({
      statusCode: `${statusCode}`,
      message,
      data: sms
    })
  }

  async save(message: Partial<Message>, res: Response): Promise<Message> {
    const { body, to_user, sms_status, token } = message;
    const { user_name } = token;
    const queryString = {
      text: 'INSERT INTO "message"(body, to_user, from_user, sms_status) VALUES ($1, $2, $3, $4)  RETURNING *;',
      values: [body, to_user, user_name, 'unread'],
    }
    try {
      const result = await this.pool.query(queryString);
      const status = {
        statusCode: 201,
        message: 'Your message was sent succesfully',
      }
      return this.successResponse(result.rows[0], res, status);
    } catch (err) {
      createLogger.log({
        level: 'info',
        message: `MessageRepository.ts @ save(): Could not create message >> ${
          err
          }`,
      });
      throw `Could not create message (${err})`;
    }
  }

  async get(conditions = {}) {
    let client;
    try {
      client = await this.pool.connect();
      let q = 'SELECT * FROM message WHERE 1 = 1';
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      const res = await this.pool.query(q);
      return res.rows.map(user => new Message(user));
    } catch (err) {
      throw `Could not query Messages (${err})`;
    } finally {
      if (client) client.release();
    }
  }

  async getAll(user) {
    const { response: res } = user
    const queryString = {
      name: 'fetch-user',
      text: 'SELECT * FROM message',
    };
    try {
      const result = await this.pool.query(queryString);
      const status = {
        statusCode: 200,
        message: 'Message retrieved successfully',
      }
      if (!result.rows) {
        return res.status(404).json({
          status: 404,
          success: 'false',
          message: 'No message sent for this user',
        });
      }
      return this.successResponse(result.rows, res, status)
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

  async getOne(user): Promise<Message> {
    let result;
    const {id,response: res} = user
    try {
      result = await this.get({ id });
      if (!result[0]) {
        return res.status(404).json({
          status: 404,
          success: 'false',
          message: 'The message you have chosen does not exist',
        });
      }
      const status = {
        statusCode: 200,
        message: 'Message retrieved successfully',
      }
      return this.successResponse(result[0], res, status)
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

  async delete(user): Promise<Message> {
    const {id, response:res, Request:req} = user;
    const result = await this.pool.query(
      `DELETE FROM message WHERE id = $1`,
      [id],
    );
    if (!result.rowCount) {
      return res.status(404).json({
        status: 404,
        success: 'false',
       message: 'The message you have chosen does not exist',
      });
    }
    return res.json()({
      statusCode: 201,
      message: `${result.rowCount} was deleted sucessfully`,
    });

  }
}