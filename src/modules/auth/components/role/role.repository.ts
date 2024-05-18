import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  DEFAULT_COUNT,
  DEFAULT_PAGE,
} from '@/common/constants/pagination.constant';
import { escapeRegex } from '@/common/utils/escape-regx.util';
import { DeleteRoleInput } from '@/modules/auth/components/role/dto/delete-role.dto';
import {
  FindRoleByIdInput,
  FindRoleByIdsInput,
} from '@/modules/auth/components/role/dto/find-role.dto';
import {
  SearchRoleInput,
  SearchRoleOutput,
} from '@/modules/auth/components/role/dto/search-role.dto';
import { UpdateRoleInput } from '@/modules/auth/components/role/dto/update-role.dto';
import {
  RoleEntity,
  TRoleEntity,
} from '@/modules/auth/components/role/entity/role.entity';
import { RoleEntityFactory } from '@/modules/auth/components/role/entity/role.factory';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(RoleEntity.name)
    private readonly roleModel: Model<TRoleEntity>,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  public async findById({ id }: FindRoleByIdInput): Promise<RoleModel | null> {
    const role = await this.roleModel.findById(id).exec();
    return this.roleFactory.createFromEntity(role);
  }

  async findManyById({ ids }: FindRoleByIdsInput): Promise<RoleModel[]> {
    const roles: RoleEntity[] = await this.roleModel
      .find({ _id: { $in: ids } })
      .exec();

    const roleModel: RoleModel[] = [];
    roles.map(it => {
      roleModel.push(this.roleFactory.createFromEntity(it));
    });

    return roleModel;
  }

  public async findByName(name: string): Promise<RoleModel | null> {
    const role = await this.roleModel.findOne({ name: name }).exec();
    return this.roleFactory.createFromEntity(role);
  }

  public async findOneItemByName(
    name: string,
    id: string | null,
  ): Promise<RoleModel | null> {
    const role = await this.roleModel.findOne({
      $and: [{ name: name }, { _id: { $ne: id } }],
    });
    return this.roleFactory.createFromEntity(role);
  }

  public async findOneItemByTitle(
    title: string,
    id: string | null,
  ): Promise<RoleModel | null> {
    const role = await this.roleModel.findOne({
      $and: [{ title: title }, { _id: { $ne: id } }],
    });
    return this.roleFactory.createFromEntity(role);
  }

  async search({
    count: inputCount,
    page: inputPage,
    text,
  }: SearchRoleInput): Promise<SearchRoleOutput> {
    const count = inputCount || DEFAULT_COUNT;
    const page = inputPage || DEFAULT_PAGE;

    const safeText = text ? escapeRegex(text) : text;

    const searchResults = await this.roleModel.aggregate([
      {
        $match: {
          ...(text && {
            $or: [{ $text: { $search: text } }, { name: { $regex: safeText } }],
          }),
        },
      },
      {
        $sort: { _id: -1 },
      },
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
    ]);
    const [finalResults = {}] = searchResults;
    const totalCount = finalResults.totalCount?.[0]?.count || 0;

    return {
      success: true,
      results: finalResults.results,
      totalCount,
      totalPages: Math.ceil(totalCount / inputCount),
    };
  }

  public async directCreate(roleEntity: RoleEntity): Promise<void> {
    const role = new this.roleModel(roleEntity);
    await role.save();
  }

  public async create(roleInput: RoleModel): Promise<void> {
    const role = new this.roleModel(this.roleFactory.create(roleInput));
    await role.save();
  }

  public async update({
    roleId,
    ...restOfArgs
  }: UpdateRoleInput): Promise<void> {
    await this.roleModel
      .findByIdAndUpdate(roleId, { ...restOfArgs }, { new: true })
      .exec();
  }

  public async delete({ roleId }: DeleteRoleInput): Promise<void> {
    await this.roleModel.findByIdAndDelete(roleId).exec();
  }

  async bulkDelete(ids: string[]): Promise<boolean> {
    const wereRemoved = await this.roleModel.deleteMany({
      _id: { $in: ids },
    });
    return wereRemoved.acknowledged;
  }
}
