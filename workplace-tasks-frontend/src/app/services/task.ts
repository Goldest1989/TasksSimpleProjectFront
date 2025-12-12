import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId?: string | null;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'done';
  color?: string; // cor aleatória para exibição
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {

  private apiUrl = 'https://localhost:7132/api/Task';

  constructor(private http: HttpClient) {}

  // GET /tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // POST /tasks
  createTask(data: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data);
  }

  // PUT /tasks/{id}
  updateTask(id: string, data: UpdateTaskRequest): Observable<Task> {
    console.log("update task",id,data);
    return this.http.put<Task>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE /tasks/{id}
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
