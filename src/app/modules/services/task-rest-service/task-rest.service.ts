import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Task } from '@models/task/task.dto';

import { environment } from '@environments/environment';
import { IUpdateListData, IListsData } from '@interfaces/update-list-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskRestService {

  constructor(private http: HttpClient) { }

  createTask(newTask: Task): Observable<IUpdateListData> {
    return this.http.post<IUpdateListData>(`${environment.apiUrl}/tasks/create`, newTask);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  getTasksByLists(): Observable<IUpdateListData> {
    return this.http.get<IUpdateListData>(`${environment.apiUrl}/tasks/list`);
  }

  getPriorityTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks/?isPriority=true`);
  }

  updateTaskById(id: number, task: Task): Observable<IUpdateListData> {
    return this.http.put<IUpdateListData>(`${environment.apiUrl}/tasks/update/${id}`, task);
  }

  updateTasksLists(data: IListsData): Observable<IUpdateListData> {
    return this.http.put<IUpdateListData>(`${environment.apiUrl}/tasks/lists`, data);
  }

  deleteTaskById(id: number): Observable<IUpdateListData> {
    return this.http.delete<IUpdateListData>(`${environment.apiUrl}/tasks/delete/${id}`);
  }

}
