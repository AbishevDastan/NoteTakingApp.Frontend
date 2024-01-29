import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AddCategoryDto } from '../models/category/add-category-dto';
import { CategoryDto } from '../models/category/category-dto';
import { UpdateCategoryDto } from '../models/category/update-category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "Categories";

  constructor(private http: HttpClient) { }

  getCategoryById (id?: number) : Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  getCategories () : Observable<Array<CategoryDto>> {
    return this.http.get<Array<CategoryDto>>(`${environment.apiUrl}/${this.url}`);
  }

  // searchNotes (searchText: string) : Observable<Array<CategoryDto>> {
  //   return this.http.get<Array<CategoryDto>>(`${environment.apiUrl}/${this.url}/${searchText}/search`);
  // }

  addCategory(dto: AddCategoryDto) : Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/${this.url}`, dto);
  }

  updateCategory(dto: UpdateCategoryDto, id: number) : Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/${this.url}/${id}`, dto);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
