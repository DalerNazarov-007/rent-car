import { UserRole } from 'src/common/enums/user-role.enum';

export interface AuthJwtPayload {
  sub: number;
  role: UserRole;
}
