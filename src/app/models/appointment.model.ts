export interface Appointment {
  id: string;
  customerID: string;
  displayNameC: string;
  emailC: string;
  phoneC: string;
  addressC: string;
  designerID: string;
  displayNameD: string;
  emailD: string;
  phoneD: string
  dateRange: string[];
  location: string;
  transactionDetails: string;
  dateCreated: Date;
}
