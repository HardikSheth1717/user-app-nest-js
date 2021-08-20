import { Injectable } from '@nestjs/common';
import { UserQuery } from '../query/user.query';

@Injectable()
export class UserService {
    private userQuery : UserQuery;

    constructor(){
       this.userQuery = new UserQuery();
    }

    getUserList(): Promise<[]> {
        return this.userQuery.getUserList();
    }

    getUserDetails(id: number): Promise<object> {
        return this.userQuery.getUserDetails(id);
    }

    saveUser(id: number, firstName: string, lastName: string, age: number, gender: string): Promise<number> {
        return this.userQuery.saveUse(id, firstName, lastName, age, gender);
    }

    deleteUser(id: number): Promise<number> {
        return this.userQuery.deleteUser(id);
    }
}