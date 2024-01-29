import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NoteDto } from '../models/note/note-dto';
import { AddNoteDto } from '../models/note/add-note-dto';
import { UpdateNoteDto } from '../models/note/update-note-dto';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url = "Notes";

  constructor(private http: HttpClient) { }

  private selectedNoteSubject = new BehaviorSubject<NoteDto | null>(null);
  selectedNote$ = this.selectedNoteSubject.asObservable();

  getSelectedNote(): NoteDto | null {
    return this.selectedNoteSubject.value;
  }

  setSelectedNote(note: NoteDto) {
    this.selectedNoteSubject.next(note);
  }

  getNoteById(id?: number) : Observable<NoteDto> {
    return this.http.get<NoteDto>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  getNotes() : Observable<Array<NoteDto>> {
    return this.http.get<Array<NoteDto>>(`${environment.apiUrl}/${this.url}`);
  }

  getNotesByCategoryId(categoryId?: number) : Observable<Array<NoteDto>> {
    return this.http.get<Array<NoteDto>>(`${environment.apiUrl}/${this.url}/${categoryId}/get-by-category-id`);
  }

  searchNotes (searchText: string) : Observable<Array<NoteDto>> {
    return this.http.get<Array<NoteDto>>(`${environment.apiUrl}/${this.url}/${searchText}/search`);
  }

  addNote(dto: AddNoteDto) : Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/${this.url}`, dto);
  }

  updateNote(dto: UpdateNoteDto, id: number) : Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/${this.url}/${id}`, dto);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
