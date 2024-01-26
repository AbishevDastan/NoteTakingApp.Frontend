import { Component } from '@angular/core';
import { AddNoteDto } from 'src/app/models/note/add-note-dto';
import { NoteDto } from 'src/app/models/note/note-dto';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  constructor(private noteService: NoteService) { }

  searchText?: string;

  notes?: Array<NoteDto>;

  addNoteDto: AddNoteDto = {
    title: "",
    content: ""
  };

  selectNote(note: NoteDto) {
    this.noteService.setSelectedNote(note);
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes().subscribe((data) => {
      console.log(data);
      this.notes = data
    });
  }

  searchNotes() {
    if (this.searchText) {
      this.noteService.searchNotes(this.searchText)
        .subscribe((result: Array<NoteDto>) => {
          this.notes = result;
        });
    } else {
      this.getNotes();
    }
  }

addNote() {
    this.noteService.addNote(this.addNoteDto).subscribe(
      (data) => {
        console.log('Note added successfully');
        this.getNotes();
      },
      (error) => {
        console.error('Error adding note');
      });
  }
}
