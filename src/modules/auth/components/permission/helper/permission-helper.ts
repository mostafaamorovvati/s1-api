import { BadRequestException, Injectable } from '@nestjs/common';

import {
  PERMISSION_ID_IS_NOT_CORRECT,
  PERMISSION_NAME_DUPLICATED,
  PERMISSION_TITLE_DUPLICATED,
} from '@/modules/auth/components/permission/constant/error-message.constant';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';

@Injectable()
export class PermissionHelepr {
  constructor(private readonly repository: PermissionRepository) {}

  async validatePermissionId(permId: string) {
    const role = await this.repository.findById({ id: permId });
    if (!role || role === null)
      throw new BadRequestException(PERMISSION_ID_IS_NOT_CORRECT);
  }

  async validatePermissionName(name: string, permId: string | null) {
    const role = await this.repository.findOneItemByName(name, permId);
    if (role) throw new BadRequestException(PERMISSION_NAME_DUPLICATED);
  }

  async validatePermissionTitle(title: string, permId: string | null) {
    const role = await this.repository.findOneItemByTitle(title, permId);
    if (role) throw new BadRequestException(PERMISSION_TITLE_DUPLICATED);
  }
}
