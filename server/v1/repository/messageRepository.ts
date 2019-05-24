/**
 * @file message Repository
 */

import { IRepository } from './Repository';
import { Pool } from 'pg';

export type MessageId = number;

export class Message {
    id: MessageId;
    body: String;
    to_user: String;
    from_user: String;
    sms_status: String;
}