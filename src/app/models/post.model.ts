import { User } from "./user.model";

export interface Post {
  id: string;
  authorID: string;
  author?: User;
  title: string;
  summary: string;
  thumbnail?: string;
  content?: string;
  gallery?: string[];
  category?: string;
  keywords?: string[];
  status: string;
  liked: string[];
  dateCreated: Date;
  mainColor: string[];
  pattern: string[];
  displayNameAuthor: string;
  authorAvatar: string;
}
