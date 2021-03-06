export interface User {
  id?: string;
  uid: string;
  email: string;
  password?: string;
  role: string;
  displayName?: string;
  gender?: boolean;
  emailVerificationCode?: string;
  avatarURL?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  about?: string;
  followed?: string[];
  social?: string[];
  tags?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
