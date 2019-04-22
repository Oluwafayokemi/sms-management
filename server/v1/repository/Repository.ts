
export interface IRepository<K, T> {
  getOne(id: K): Promise<T>;
  getAll(): Promise<T[]>;
  save(item: T): Promise<T>;
  delete(id: K): Promise<number>;
}
