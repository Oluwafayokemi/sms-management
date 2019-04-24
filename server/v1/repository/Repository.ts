
export interface IRepository<K, T> {
  save(item: T): Promise<T>;
}
