import type { QueryOptions } from '@nestjs/graphql';
import type { Document } from 'mongoose';

import { PaginationInput } from '@/common/dtos/pagination.dto';
import { SearchData } from '@/common/interfaces/search.data.interface';

export interface BaseInterfaceRepository<T extends Document> {
  create(data: any): Promise<T>;
  model(data: any): T;
  findOneById(id: string): Promise<T | null>;
  findByClientId(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  remove(id: string): Promise<T | null>;
  findOneBy(
    filter?: any,
    projection?: any | null,
    options?: QueryOptions | null,
  ): Promise<T | null>;
  count(): Promise<number>;

  getLastId(): Promise<number>;
  getNextId(): Promise<number>;
  updatePostCount(id: number, isInc: boolean): void;
  bulkUpdatePostCount(ids: number[], isInc: boolean): void;
  getTotalCount(): Promise<number>;
  getAll(input: PaginationInput): Promise<SearchData<T>>;
  deleteAllDocuments(): Promise<boolean>;
}
