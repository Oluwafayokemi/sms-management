import { UserController } from "./controller/UserController";
import { MessageController } from './controller/MessageController';

export const Routes = [
  {
    method: 'post',
    route: '/api/auth/signup',
    controller: UserController,
    action: 'save'
  },
  {
    method: 'post',
    route: '/api/auth/login',
    controller: UserController,
    action: 'getOne'
  },
  {
    method: 'post',
    route: '/api/message',
    controller: MessageController,
    action: 'save'
  },
  {
    method: 'get',
    route: '/api/message',
    controller: MessageController,
    action: 'getAll'
  },
  {
    method: 'get',
    route: '/api/message/:id',
    controller: MessageController,
    action: 'getOne'
  },
  {
    method: 'delete',
    route: '/api/message/:id',
    controller: MessageController,
    action: 'delete'
  },

]