export default abstract class BaseInMemoryRepository<T extends Record<string, any>> {
  abstract compare(a: T, b: T): boolean;

  items: Array<T> = [];

  save(entity: T): void {
    const alreadyExistingIndex = this.items.findIndex(item => this.compare(item, entity));

    if (alreadyExistingIndex !== -1) {
      this.items[alreadyExistingIndex] = {
        ...this.items[alreadyExistingIndex],
        ...entity,
      };
      return;
    }

    this.items.push(entity);
  }
}
