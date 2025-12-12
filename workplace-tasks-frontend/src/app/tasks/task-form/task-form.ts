import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task';
import { ActivatedRoute, Router } from '@angular/router';

interface TaskStatusOption {
  label: string;
  value: number;
}

@Component({
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id!: string;

  taskStatusOptions: TaskStatusOption[] = [
    { label: 'Pending', value: 1 },
    { label: 'In Progress', value: 2 },
    { label: 'Done', value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [1, Validators.required], // default status "Pending"
    });

    // Checa se estamos em modo edição pelo state do router ou id
    const stateTask = history.state.task;
    this.id = stateTask?.id;
    this.isEdit = !!this.id || !!stateTask;

    if (this.isEdit) {
      if (stateTask) {
        // Preenche o form com os dados recebidos ao navegar
        this.form.patchValue(stateTask);
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    const payload = {
      id: this.id, // necessário para update
      title: this.form.value.title,
      description: this.form.value.description,
      status: Number(this.form.value.status) // enviar como número
    };

    const request = this.isEdit
      ? this.taskService.updateTask(this.id, payload)
      : this.taskService.createTask(payload);

    request.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: err => console.error('Erro ao salvar task', err)
    });
  }


  cancel() {
    this.router.navigate(['/tasks']);
  }
}
