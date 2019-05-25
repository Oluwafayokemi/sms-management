/**
 * @file Message Controller
 */

//  Modules
import { NextFunction, Request, Response } from 'express';
import { pool } from '../models';
// Interface
import { MessageRepository, Message } from '../repository/MessageRepository';
// utils
import { sendCustomError } from '../util';
// Validation
import validateRequest from '../middleware/validation';
import MessageValidator from '../middleware/validation/messageValidator';

/**
 * @class MessageController
 * @description handles endpoint to POST, GET, DELETE and UPDATE messages
 * @returns {ReactElement}
 */
export class MessageController {
  private repo = new MessageRepository(pool);

  /**
   * @method save
   * @description create messages
   * @param request - function
   * @param response - function
   * @param next - function
   */
  async save(request, response: Response, next: NextFunction) {
    try {
      const newMessage = new Message(request.body);
      const errors = await validateRequest(MessageValidator, newMessage);
      if (!errors) {
        response.status(201); // created
        const message = await this.repo.save(request.body, response);
        return message;
      }
      sendCustomError(response, 400, errors);
    } catch (err) {
      throw `could not create message (${err})`
    }
  }

  /**
   * @method getAll
   * @description get list of all messages
   * @param request 
   * @param response 
   * @param next 
   */
  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200);
      return this.repo.getAll({ ...request.params, response, request });
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

  /**
   * @method getOne
   * @description get a message belonging to the id in the param request
   * @param request 
   * @param response 
   * @param next 
   */
  async getOne(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200);
      return this.repo.getOne({ ...request.params, response, request });
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

  /**
   * @method delete
   * @description delete a message belongin to the id in the param request
   * @param request 
   * @param response 
   * @param next 
   */
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(204);
      return this.repo.delete({ ...request.params, response, request });
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

}