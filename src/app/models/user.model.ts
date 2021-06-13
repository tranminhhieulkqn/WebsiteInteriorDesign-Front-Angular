export interface User {
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
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
