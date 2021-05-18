export interface Roles {
  customer?: boolean;
  designer?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
