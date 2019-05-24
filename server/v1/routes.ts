import { UserController } from "./controller/UserController";

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
  }
]