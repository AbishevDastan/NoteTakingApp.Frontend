import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotesComponent } from './components/shared/notes/notes.component';
import { NoteComponent } from './components/shared/note/note.component';
import { CategoriesComponent } from './components/shared/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { NoteEditorComponent } from './components/shared/note-editor/note-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotesComponent,
    NoteComponent,
    CategoriesComponent,
    NoteEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
