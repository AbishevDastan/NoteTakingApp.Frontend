import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { switchMap, timer } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  constructor(private noteService: NoteService) { }

  @Input() note?: {
    id: number; 
    title: string;
    content: string; 
  };

  ngOnInit() {
    this.getNoteById();
  }

  getNoteById() {
    this.noteService.getNoteById(this.note?.id).subscribe((data) => {
      console.log(data);
      this.note = data;
    })
  }
}