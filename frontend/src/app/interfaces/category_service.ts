import { Observable } from 'rxjs';
import { EventCategory } from '../interfaces/category';
import { Res } from './res';

export interface EventCategoryServices {
  createEventCategory(category: EventCategory): Observable<Res<null>>;
  updateEventCategory(category: EventCategory): Observable<Res<null>>;
  deleteEventCategory(categoryId: string): Observable<Res<null>>;
  getEventCategory(id: string): Observable<Res<EventCategory | null>>;
  getAllEventCategories(): Observable<Res<EventCategory[] | null>>;
  getEventCategoriesByAdminId(): Observable<Res<EventCategory[] | null>>;
}
