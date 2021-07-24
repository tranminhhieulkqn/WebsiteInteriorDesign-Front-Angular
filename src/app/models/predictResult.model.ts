export interface PredictResult {
  userID: string;
  imageURL: string;
  status: string;
  labelPredict: string;
  probability: Number[];
  dateCreated: Date;
}
