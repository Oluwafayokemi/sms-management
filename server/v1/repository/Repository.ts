import { Response, Request } from "express";

export interface IUserRepository<K, T> {
  save(item: T, response: Response, request: Request): Promise<T>;
  get(conditions: {}): Promise<T>;
  getOne(email: string, user_name: string, password: string): Promise<T>;
}

export interface IMessageRepository<K, T> {
  save(item: T, response: Response, request: Request): Promise<T>;
  get(conditions: {}): Promise<T>;
  getAll(email: string, user_name: string);
  getOne(id: K): Promise<T>;
  delete(id: K): Promise<T>;
}