import { User } from "./user.model";

export interface Post {
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
  likeCount: number;
  dateCreated: Date;
}
