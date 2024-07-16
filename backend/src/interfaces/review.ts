export interface Review {
  id: string;
  rating: number;
  comment: string;
  description: string;
  ticketId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
