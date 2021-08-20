import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomePage(): string {
    return `
      <h1>User mangement system</h1>
      <a href="/add-user">Add user</a>
      <a href="/users">User list</a>
    `;
  }

  get404Page(): string {
    return `
      <h1>404 - Page not found</h1>
      <a href="/">Home</a>
    `;
  }
}
