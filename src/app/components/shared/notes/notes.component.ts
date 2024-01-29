import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryDto } from 'src/app/models/category/category-dto';
import { AddNoteDto } from 'src/app/models/note/add-note-dto';
import { NoteDto } from 'src/app/models/note/note-dto';
import { CategoryService } from 'src/app/services/category.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  constructor(private noteService: NoteService, private categoryService: CategoryService) { }

  searchText?: string;

  selectedCategoryId?: number;

  notes?: Array<NoteDto>;

  addNoteDto: AddNoteDto = {
    title: "",
    content: ""
  };

  categories?: Array<CategoryDto>

  selectNote(note: NoteDto) {
    this.noteService.setSelectedNote(note);
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.loadNotes();
  }

  ngOnInit() {
      this.loadNotes();
      this.getCategories();
  }

  loadNotes() {
    if(this.selectedCategoryId)
    {
      this.getNotesByCategoryId();
    } else {
      this.getNotes();
    }
  }

  getNotesByCategoryId() {
    this.noteService.getNotesByCategoryId(this.selectedCategoryId).subscribe((data: Array<NoteDto>) => {
            this.notes = data
    });
  }

  getNotes() {
    this.noteService.getNotes().subscribe((data) => {
      console.log(data);
      this.notes = data
    });
  }

  searchNotes() {
    if (this.searchText) {
      this.noteService.searchNotes(this.searchText).subscribe((data: Array<NoteDto>) => {
          this.notes = data;
        });
    } else {
      this.getNotes();
    }
  }

// addNote() {
//     this.noteService.addNote(this.addNoteDto).subscribe(
//       (data) => {
//         console.log('Note added successfully');
//         this.getNotes();
//       },
//       (error) => {
//         console.error('Error adding note');
//       });
//   }

  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }
}
