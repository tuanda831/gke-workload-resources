import { Client } from '@elastic/elasticsearch';
import { QueryDslQueryContainer } from '@elastic/elasticsearch/api/types';

export interface Repository<T> {
  setIndexName(index: string): void;
  index(entity: T): Promise<void>;
  search(query: any): Promise<T[]>;
}

export class BaseRepository<T> implements Repository<T> {
  private indexName: string;

  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  setIndexName(indexName: string): void {
    this.indexName = indexName;
  }

  async index(entity: T): Promise<void> {
    await this.client.index<T, any>({
      index: this.indexName,
      refresh: true,
      body: entity,
    });
  }

  async bulk(dataset: T[]): Promise<void> {
    const body = dataset.flatMap((doc) => [
      { index: { _index: this.indexName } },
      doc,
    ]);

    this.client.bulk<T[], any>({ refresh: true, body });
  }

  async search(query: QueryDslQueryContainer): Promise<T[]> {
    const { body } = await this.client.search({
      index: this.indexName,
      body: { query },
    });

    return body.hits.hits;
  }
}
