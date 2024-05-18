import { BadRequestException, Injectable } from '@nestjs/common';

import {
  ROLE_ID_IS_NOT_CORRECT,
  ROLE_NAME_DUPLICATED,
  ROLE_TITLE_DUPLICATED,
} from '@/modules/auth/components/role/constant/error-message.constant';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@Injectable()
export class RoleHelepr {
  constructor(private readonly roleRepository: RoleRepository) {}

  async validateRoleId(roleId: string) {
    const role = await this.roleRepository.findById({ id: roleId });
    if (!role || role === null)
      throw new BadRequestException(ROLE_ID_IS_NOT_CORRECT);
  }

  async validateRoleName(name: string, roleId: string | null) {
    const role = await this.roleRepository.findOneItemByName(name, roleId);
    if (role) throw new BadRequestException(ROLE_NAME_DUPLICATED);
  }

  async validateRoleTitle(title: string, roleId: string | null) {
    const role = await this.roleRepository.findOneItemByTitle(title, roleId);
    if (role) throw new BadRequestException(ROLE_TITLE_DUPLICATED);
  }
}
