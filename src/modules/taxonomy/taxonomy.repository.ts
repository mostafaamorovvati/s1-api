import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage } from 'mongoose';

import { stringListToObjectIds } from '@/common/utils/string-list-to-object-ids';
import {
  FindTaxonomyBySlugInput,
  FindTaxonomyInput,
} from '@/modules/taxonomy/dto/find-taxonomy.dto';
import { SearchTaxonomyInput } from '@/modules/taxonomy/dto/search-taxonomy.dto';
import {
  TaxonomyEntity,
  TTaxonomy,
} from '@/modules/taxonomy/entity/taxonomy.entity';
import { TaxonomyEntityFactory } from '@/modules/taxonomy/entity/taxonomy.factory';
import { Taxonomy } from '@/modules/taxonomy/model/taxonomy.model';

@Injectable()
export class TaxonomyRepository {
  constructor(
    @InjectModel(TaxonomyEntity.name)
    private readonly taxonomyModel: Model<TTaxonomy>,
    protected readonly taxonomyFactory: TaxonomyEntityFactory,
  ) {}

  public async create(taxonomyInput: Taxonomy): Promise<void> {
    const taxonomy = new this.taxonomyModel(
      this.taxonomyFactory.create(taxonomyInput),
    );
    await taxonomy.save();
  }

  public async update(taxonomyInput: Taxonomy): Promise<void> {
    const entity = this.taxonomyFactory.create(taxonomyInput);
    await this.taxonomyModel
      .findOneAndReplace({ _id: taxonomyInput.getId() }, entity)
      .exec();
  }

  public async delete(id: string): Promise<void> {
    await this.taxonomyModel.findByIdAndDelete(id).exec();
  }

  public async detachParentReference(id: string): Promise<void> {
    await this.taxonomyModel.updateMany(
      { parent: id },
      { $unset: { parent: null } },
    );
  }

  public async findById({ id }: FindTaxonomyInput): Promise<Taxonomy | null> {
    const taxonomy = await this.taxonomyModel.findById(id).exec();
    return taxonomy ? this.taxonomyFactory.createFromEntity(taxonomy) : null;
  }

  public async findBySlug({
    slug,
  }: FindTaxonomyBySlugInput): Promise<Taxonomy | null> {
    const taxonomy = await this.taxonomyModel.findOne({ slug }).exec();
    return taxonomy ? this.taxonomyFactory.createFromEntity(taxonomy) : null;
  }

  public async search({
    text,
    page,
    count,
    type,
    ids: initialIds,
  }: SearchTaxonomyInput) {
    const ids = initialIds?.map(id => new mongoose.Types.ObjectId(id)); // Define the query condition
    const query = {
      ...(text && { $text: { $search: text } }),
      ...(type && { type: type }),
      ...(ids && ids.length && { _id: { $in: ids } }),
    };
    // Define the pagination options
    const options = {
      page: Number(page),
      limit: Number(count),
    };
    // Define the aggregation pipeline
    const pipeline: PipelineStage[] = [
      { $match: query },
      {
        $facet: {
          results: [{ $skip: (page - 1) * count }, { $limit: count }],
          totalCount: [{ $count: 'count' }],
        },
      },
      // Add the total count and total pages fields
      {
        $addFields: {
          totalCount: {
            $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0],
          },
          totalPages: {
            $ceil: {
              $divide: [
                { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] },
                options.limit,
              ],
            },
          },
        },
      },
      // Project the fields you want to return
      { $project: { results: 1, totalCount: 1, totalPages: 1 } },
    ];
    // Execute the aggregation
    const [data] = await this.taxonomyModel.aggregate(pipeline).exec();

    const results = (
      data?.results
        ? data?.results?.map(tx => this.taxonomyFactory.createFromEntity(tx))
        : []
    ) as Taxonomy[];

    return {
      totalCount: (data?.totalCount as number) || 0,
      totalPages: (data?.totalPages as number) || 0,
      results,
    };
  }
}
