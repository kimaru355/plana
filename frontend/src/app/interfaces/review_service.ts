import { Res } from "./res";
import { Review } from "./review";

export interface ReviewServices {
  createReview(review: Review): Promise<Res<null>>;
  updateReview(review: Review): Promise<Res<null>>;
  deleteReview(id: string): Promise<Res<null>>;
  getAllReviews(): Promise<Res<Review[] | null>>;
  getReviewsByTicketId(ticketId: string): Promise<Res<Review[] | null>>;
}
