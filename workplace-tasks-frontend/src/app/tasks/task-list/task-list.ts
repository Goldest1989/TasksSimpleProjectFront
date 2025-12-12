import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],   // ⬅️ OBRIGATÓRIO PARA USAR *ngFor e *ngIf
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList implements OnInit {
  tasks: any[] = [];
  loading = true;
private colors = [
  "#FFE082", "#FFAB91", "#CE93D8", "#80DEEA",
  "#A5D6A7", "#FFCC80", "#F48FB1", "#81D4FA"
];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {

    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd && event.urlAfterRedirects === '/tasks') {
      this.loadTasks();
    }
  });
  }

 ngOnInit() {
    this.loadTasks();

    // Recarrega quando a rota é ativada de novo
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.loadTasks());
  }

 ionViewWillEnter() {
    this.loadTasks();
  }

  loadTasks() {
   this.taskService.getTasks().subscribe({
  next: tasks => {
    console.log("Tasks recebidas:", tasks);
    this.tasks = tasks.map(t => ({
      ...t,
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    }));
    this.cd.detectChanges();
  },
  error: err => {
    console.error("Erro ao carregar tasks:", err);
  }
});
  }

 // TaskListComponent
  editTask(task: any) {
    console.log("tasktosend",task);
    this.router.navigate(['/tasks/edit'], { state: { task } });
  }
  createTask() {
    this.router.navigate(['/tasks/new']);
  }

  deleteTask(id: string) {
    if (confirm('Tem certeza que deseja apagar esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: err => console.error(err)
      });
    }
  }
}
