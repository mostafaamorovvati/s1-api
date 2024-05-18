import { QueryOptions } from '@nestjs/graphql';
import {} from '@nestjs/mongoose';
import type {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  UpdateAggregationStage,
} from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { PaginationInput } from '@/common/dtos/pagination.dto';
import { SearchData } from '@/common/interfaces/search.data.interface';
import type { BaseInterfaceRepository } from '@/common/repositories/base.interface.repository';

export abstract class BaseAbstractRepository<T extends Document>
  implements BaseInterfaceRepository<T>
{
  protected constructor(private entity: Model<T>) {
    this.entity = entity;
  }

  public async create(data: any): Promise<T> {
    const createdEntity = new this.entity(data);
    return createdEntity.save();
  }

  public model(data: any): T {
    const createdEntity = new this.entity(data);
    return createdEntity;
  }

  public async findOneById(id: string): Promise<T | null> {
    return this.entity.findById(id).exec();
  }

  async findByClientId(id: string): Promise<T | null> {
    const result = await this.entity.findOne({ client: id }).exec();
    return result;
  }

  public async findOneBy(
    filter?: FilterQuery<T>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): Promise<T | null> {
    return this.entity.findOne(filter, projection, options);
  }

  public async findAll(
    filter: FilterQuery<T> | undefined = {},
    projection?: any | null,
    options?: QueryOptions | null,
  ): Promise<T[]> {
    return await this.entity.find(filter, projection, options).exec();
  }

  remove(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

  // public async remove(id: string): Promise<T | null> {
  //   return this.entity.findByIdAndDelete(id);
  // }

  async count() {
    return this.entity.estimatedDocumentCount();
  }

  async getLastId(): Promise<number> {
    const [data] = await this.entity.find().sort({ _id: -1 }).limit(1);
    const _id = data?._id || 0;
    return _id;
  }

  async getNextId(): Promise<number> {
    const _id = await this.getLastId();
    return _id + 1;
  }

  async updatePostCount(id: number, isInc: boolean) {
    const inc = isInc ? 1 : -1;
    return this.entity
      .updateOne({ _id: id }, { $inc: { postCount: inc } })
      .exec();
  }

  async bulkUpdatePostCount(ids: number[], isInc: boolean) {
    const inc = isInc ? 1 : -1;
    return this.entity
      .updateMany({ _id: { $in: ids } }, { $inc: { postCount: inc } })
      .exec();
  }

  public async getTotalCount(): Promise<number> {
    const pipeline: PipelineStage[] = [
      {
        $facet: {
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];
    const [searchData = {}] = await this.entity.aggregate(pipeline);
    return searchData.totalCount?.[0]?.count;
  }

  public async getAll({
    count: inputCount,
    page: inputPage,
  }: PaginationInput): Promise<SearchData<T>> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;
    const pipeline: PipelineStage[] = [
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];

    const [searchData = {}] = await this.entity.aggregate(pipeline);

    return {
      results: searchData.results,
      totalCount: searchData.totalCount?.[0]?.count,
    };
  }

  public async deleteAllDocuments(): Promise<boolean> {
    const result = await this.entity.deleteMany({});
    return result.acknowledged;
  }
}
