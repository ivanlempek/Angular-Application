import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Todo } from "../models/todo.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public mode = 'list';  // Modo lista
  public todos: Todo[] = [];
  public title: String = 'Lista de Tarefas';
  public form: FormGroup;

  // Formulário
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  // Adiciona uma tarefa na lista e gera um id
  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  // Limpa a tarefa do input após o save
  clear() {
    this.form.reset();
  }

  // Remove uma tarefa
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  // Estado da tarefa feita
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  // Estado da tarefa não feita
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  // Salva uma tarefa
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  // Carrega as tarefas salvas
  load() {
    const data = localStorage.getItem('todos');
    if (data != null) {
      this.todos = JSON.parse(data);
    }
  }

  // Troca de modos entre 'list' e 'add'
  changeMode(mode: string) {
    this.mode = mode;
  }
}
