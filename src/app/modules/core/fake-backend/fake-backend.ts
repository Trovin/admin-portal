import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { testUser } from '@mocks/test-user-data';

import { TO_DO_TASKS  } from '@mocks/task-items';
import { IN_PROGRESS_TASKS } from '@mocks/task-items';
import { COMPLETED_TASKS } from '@mocks/task-items';

import { taskCategoryList } from '@enums/task-category-list.enum';


let toDoList = TO_DO_TASKS;
let inProgressList = IN_PROGRESS_TASKS;
let completedList = COMPLETED_TASKS;

const key = 'db-users';
const users = JSON.parse(localStorage.getItem(key)) || [];

if (!users.length) {
  users.push(testUser);
  localStorage.setItem(key, JSON.stringify(users));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('api/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('api/users/register') && method === 'POST':
          return register();
        case url.endsWith('api/users/refresh-token') && method === 'POST':
          return refreshToken();
        case url.endsWith('api/users/revoke-token') && method === 'POST':
          return revokeToken();
        case url.endsWith('api/users/update') && method === 'PUT':
          return updateUser();

        case url.endsWith('api/tasks/create') && method === 'POST':
          return createTasks();
        case url.endsWith('api/tasks') && method === 'GET':
          return getTasks();
        case url.endsWith('api/tasks/list') && method === 'GET':
          return getTasksByList();
        case url.endsWith('api/tasks/?isPriority=true') && method === 'GET':
          return getPriorityTasks();
        case url.includes('api/tasks/update') && method === 'PUT':
          return updateTask();
        case url.endsWith('api/tasks/lists') && method === 'PUT':
          return updateTaskLists();
        case url.endsWith('api/tasks/list') && method === 'PUT':
          return updateTaskList();
        case url.includes('api/tasks/delete') && method === 'DELETE':
          return deleteTask();

        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);

      if (!user) {
        return error('Email or password is incorrect');
      }

      user.refreshTokens.push(generateRefreshToken());
      localStorage.setItem(key, JSON.stringify(users));

      return ok({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        jwtToken: generateJwtToken(),
        selectedAnswer: user.selectedAnswer
      });
    }

    function register() {
      body.id = getLastIndex(users) + 1;
      body.refreshTokens = [generateRefreshToken()];

      users.push(body);
      localStorage.setItem(key, JSON.stringify(users));

      return ok({
        id: body.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        jwtToken: generateJwtToken(),
        selectedAnswer: body.selectedAnswer
      });
    }

    function updateUser() {
      const user = users.find(user => user.id === body.id);
      Object.assign(user, body);
      user.refreshTokens.push(generateRefreshToken());

      users.push(user);
      localStorage.setItem(key, JSON.stringify(users));

      return ok({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        jwtToken: generateJwtToken(),
        selectedAnswer: user.selectedAnswer
      });
    }

    function createTasks() {
      const tasks = [...toDoList, ...inProgressList, ...completedList];
      body.id = getLastIndex(tasks) + 1;

      switch (body.list) {
        case taskCategoryList.TO_DO:
          toDoList.unshift(body);
          break;
        case taskCategoryList.IN_PROGRESS:
          inProgressList.unshift(body);
          break;
        case taskCategoryList.COMPLETED:
          completedList.unshift(body);
          break;
      }

      return ok({
        toDoList,
        inProgressList,
        completedList
      });
    }

    function getTasks() {
      const tasks = [...toDoList, ...inProgressList, ...completedList];
      return ok(tasks);
    }

    function getTasksByList() {
      return ok({
        toDoList,
        inProgressList,
        completedList
      });
    }

    function getPriorityTasks() {
      const tasks = [...toDoList, ...inProgressList, ...completedList];
      const priorityTasks = tasks.filter(task => task.isPriority);

      return ok(priorityTasks);
    }

    function updateTask() {
      toDoList.forEach(task => task.id === body.id ? Object.assign(task, body) : task);
      inProgressList.forEach(task => task.id === body.id ? Object.assign(task, body) : task);
      completedList.forEach(task => task.id === body.id ? Object.assign(task, body) : task);

      return ok({
        toDoList,
        inProgressList,
        completedList
      });
    }

    function updateTaskList() {
      switch (body.listName) {
        case taskCategoryList.TO_DO:
          toDoList = body.data;
          break;
        case taskCategoryList.IN_PROGRESS:
          inProgressList = body.data;
          break;
        case taskCategoryList.COMPLETED:
          completedList = body.data;
          break;
      }

      return ok({
        toDoList,
        inProgressList,
        completedList
      });
    }

    function updateTaskLists() {
      toDoList = body.toDoList;
      inProgressList = body.inProgressList;
      completedList = body.completedList;

      return ok({
        toDoList,
        inProgressList,
        completedList
      });
    }

    function deleteTask() {
      const data = (url.split('/'));
      const id = Number(data[data.length - 1]);

      toDoList = toDoList.filter(task => task.id !== id);
      inProgressList = inProgressList.filter(task => task.id !== id);
      completedList = completedList.filter(task => task.id !== id);

      return ok({
        toDoList,
        inProgressList,
        completedList
      });
    }

    function refreshToken() {
      const refreshToken = getRefreshToken();
      const user = users.find(x => x.refreshTokens.includes(refreshToken));

      if (!refreshToken || !user) {
        return unauthorized();
      }

      user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
      user.refreshTokens.push(generateRefreshToken());
      localStorage.setItem(key, JSON.stringify(users));

      return ok({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        jwtToken: generateJwtToken(),
        selectedAnswer: user.selectedAnswer
      });
    }

    function getLastIndex(list): number {
      list.sort((a, b) => a.id - b.id);
      const lastItem = list[list.length - 1];
      return lastItem.id;
    }

    function revokeToken() {
      if (!isLoggedIn()) {
        return unauthorized();
      }

      const refreshToken = getRefreshToken();
      const user = users.find(x => x.refreshTokens.includes(refreshToken));

      user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
      localStorage.setItem(key, JSON.stringify(users));

      return ok();
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorized' } });
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization');
      if (!authHeader.startsWith('Bearer fake-jwt-token')) {
        return false;
      }

      // check if token is expired
      const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
      const tokenExpired = Date.now() > (jwtToken.exp * 1000);
      return !tokenExpired;
    }

    function generateJwtToken() {
      // create token that expires in 15 minutes
      const tokenPayload = { exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000) };
      return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
    }

    function generateRefreshToken() {
      const token = new Date().getTime().toString();

      // add token cookie that expires in 7 days
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;
      return token;
    }

    function getRefreshToken() {
      // get refresh token from cookie
      return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
    }
  }

}
