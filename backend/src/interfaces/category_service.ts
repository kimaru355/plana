import { EventCategory } from "@prisma/client";
import { Res } from "./res";

export interface EventCategoryServices {
  createEventCategory(category: EventCategory): Promise<Res<null>>;
  updateEventCategory(category: EventCategory): Promise<Res<null>>;
  deleteEventCategory(categoryId: string): Promise<Res<null>>;
  getEventCategory(id: string): Promise<Res<EventCategory | null>>;
  getAllEventCategories(): Promise<Res<EventCategory[] | null>>;
  getEventCategoriesByAdminId(
    adminId: string
  ): Promise<Res<EventCategory[] | null>>;
}
