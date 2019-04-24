import { UserController } from "./controller/UserController";

export const Routes = [
  {
    method: 'post',
    route: '/api/users',
    controller: UserController,
    action: 'save'
  },
  {
    method: 'get',
    route: '/api/users',
    controller: UserController,
    action: 'getUser'
  }
]