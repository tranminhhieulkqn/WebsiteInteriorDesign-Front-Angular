export interface Comment {
  id: string;
  postID: string;
  authorID: string;
  displayNameAuthor: string;
  authorAvatar: string;
  content: string;
  rated: number;
  liked: string[];
  dateCreated: Date;
}
