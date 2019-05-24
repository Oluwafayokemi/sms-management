
export interface IRepository<K, T> {
  save(item: T): Promise<T>;
  get(conditions: {}): Promise<T>;
  getOne(email: string, user_name: string, password: string): Promise<T>;
}
