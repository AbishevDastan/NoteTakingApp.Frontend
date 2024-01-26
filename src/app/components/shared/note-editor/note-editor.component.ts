import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NoteDto } from 'src/app/models/note/note-dto';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})
export class NoteEditorComponent {

  selectedNote: NoteDto | null = null;
  private autoSaveTimer: any; // Timer variable
  private noteSubscription: Subscription | undefined;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteSubscription = this.noteService.selectedNote$.subscribe((note) => {
      this.selectedNote = note;
      this.resetAutoSaveTimer(); // Reset the auto-save timer when a new note is selected
    });
  }

  ngOnDestroy() {
    if (this.noteSubscription) {
      this.noteSubscription.unsubscribe();
    }
  }

  saveChanges() {
    if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote, this.selectedNote.id).subscribe((data) => {
        console.log(data);
      });
    }
  }

  deleteNote() {
    if(this.selectedNote) {
      this.noteService.deleteNote(this.selectedNote.id).subscribe((data) => {
        console.log(data);
      });
    }
  }

  protected resetAutoSaveTimer() {
    clearTimeout(this.autoSaveTimer); // Clear existing timer
    this.autoSaveTimer = setTimeout(() => {
      this.saveChanges(); // Save changes after 2 seconds of inaction
    }, 2000);
  }
}