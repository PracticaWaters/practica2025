export type Role = 0 | 1;

export class User {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  birthDate!: string;
  gender!: string;
  avatarUrl!: string;
  password!: string;
  role!: Role;
  createdAt!: Date;
  modifiedAt!: Date;
  isDeleted!: boolean;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
