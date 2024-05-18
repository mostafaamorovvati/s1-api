import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ModelEntityFactory } from '@/common/repositories/model-entity';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';
import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';

@Injectable()
export class PermissionEntityFactory
  implements ModelEntityFactory<PermissionEntity, PermissionModel>
{
  create(model: PermissionModel): PermissionEntity | null {
    if (!model) return null;
    return {
      _id: new ObjectId(model.getId()),
      name: model.getName(),
      title: model.getTitle(),
    };
  }
  createFromEntity(entity: PermissionEntity): PermissionModel | null {
    if (!entity) return null;
    const { _id, name, title } = entity;

    return new PermissionModel(_id.toHexString(), name, title);
  }
}
