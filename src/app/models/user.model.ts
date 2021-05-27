export interface User {
  uid: string;
  email: string;
  password: string;
  role: string;
  fullName?: string;
  gender?: boolean;
  emailVerificationCode?: string;
  avatarURL?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  followed?: string[];
  status?: string;
}
