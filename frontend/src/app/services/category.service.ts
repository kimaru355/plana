import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCategoryServices } from '../interfaces/category_service';
import { EventCategory } from '../interfaces/category';
import { Res } from '../interfaces/res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements EventCategoryServices {
  private api: string = 'http://localhost:3000/categories';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') || '',
  });

  constructor(private http: HttpClient) {}

  createEventCategory(category: EventCategory): Observable<Res<null>> {
    return this.http.post<Res<null>>(`${this.api}/create`, category, {
      headers: this.headers,
    });
  }
  updateEventCategory(category: EventCategory): Observable<Res<null>> {
    return this.http.post<Res<null>>(
      `${this.api}/update/${category.id}`,
      category,
      {
        headers: this.headers,
      }
    );
  }
  deleteEventCategory(categoryId: string): Observable<Res<null>> {
    return this.http.delete<Res<null>>(`${this.api}/delete/${categoryId}`, {
      headers: this.headers,
    });
  }
  getEventCategory(id: string): Observable<Res<EventCategory | null>> {
    return this.http.get<Res<EventCategory | null>>(`${this.api}/${id}`, {
      headers: this.headers,
    });
  }
  getAllEventCategories(): Observable<Res<EventCategory[] | null>> {
    return this.http.get<Res<EventCategory[] | null>>(`${this.api}/all`, {
      headers: this.headers,
    });
  }
  getEventCategoriesByAdminId(): Observable<Res<EventCategory[] | null>> {
    return this.http.get<Res<EventCategory[] | null>>(`${this.api}/admin`, {
      headers: this.headers,
    });
  }
}
