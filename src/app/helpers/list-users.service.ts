import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryEditorialService implements InMemoryDbService {
  createDb() {
    let users = [
      { 
        id: 1,
        username: 'test', 
        password: 'test', 
        firstName: 'Test', 
        lastName: 'User', 
        mail:'a@gmail.com' 
      }
    ];
    return { users };
  }
}