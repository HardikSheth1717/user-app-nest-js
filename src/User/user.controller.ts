import { Controller, Get, Post, Param, Body, Redirect } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Get('/users')
    async getUserList(): Promise<string> {
        return this.userService.getUserList().then(data => {
            const users: UserDto[] = data;

            let htmlString = `
                <h1>User List</h1>
                <ul>
            `;

            users.forEach(user => {
                htmlString += `<li>
                    <a href="/userdetail/${user.Id}">${user.FirstName} ${user.LastName}</a>
                    <a href="/viewuser/${user.Id}">Delete</a>
                </li>`;
            });

            htmlString += `</ul>`;
            htmlString += `
                <a href="/">Home</a>
                <a href="/add-user">Add user</a>
            `;
            
            return htmlString;
        });

        
    }

    @Get('/userdetail/:userId')
    async getUserDetails(@Param() params): Promise<string> {
        return this.userService.getUserDetails(params.userId).then(data => {
            const user = data[0];

            let htmlString = `
                <h1>Edit User</h1>
                <form action="/saveUser" method="POST">
                    <label for="firstName">First name:</label>
                    <input type="text" name="firstName" value="${user.FirstName}" />
                    <label for="lastName">Last name:</label>
                    <input type="text" name="lastName" value="${user.LastName}" />
                    <label for="age">Age:</label>
                    <input type="text" name="age" value="${user.Age}" />
                    <label for="gender">Gender:</label>
                    <select name="gender">
                        <option value="Male" ${user.Gender === 'Male' ? "Selected" : ""}>Male</option>
                        <option value="Female" ${user.Gender === 'Female' ? "Selected" : ""}>Female</option>
                    </select>
                    <input type="hidden" name="id" value="${user.Id}" />
                    <button type="submit">Update user</button>
        
                    <a href="/">Home</a>
                    <a href="/users">User list</a>
                </form>
            `;

            return htmlString;
        });
    }

    @Get('/add-user')
    addNewUser(): string {
        return `
            <h1>Add User</h1>
            <form action="/saveUser" method="POST">
                <label for="firstName">First name:</label>
                <input type="text" name="firstName" />
               <label for="lastName">Last name:</label>
                <input type="text" name="lastName" />
                <label for="age">Age:</label>
                <input type="text" name="age" />
                <label for="gender">Gender:</label>
                <select name="gender">
                    <option value="Male" Selected>Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="hidden" name="id" value="0" />
                <button type="submit">Add user</button>
    
                <a href="/">Home</a>
                <a href="/users">User list</a>
            </form>
        `;
    }

    @Post('/saveuser')
    @Redirect('/users', 302)
    async saveUser(@Body() body): Promise<string> {
        const data = await this.userService.saveUser(body.id, body.firstName, body.lastName, body.age, body.gender);
        const newId = data;
        if (newId > 0) {
            return ``;
        } else {
            return `
                    <p>User not saved :(
                    <a href="/">Home</a>
                    <a href="/users">User list</a>
                `;
        }
    }

    @Get('/viewuser/:userId')
    async viewUserDetails(@Param('userId') id: number): Promise<string> {
        return this.userService.getUserDetails(id).then(data => {
            const user = data[0];

            let htmlString = `
                <h1>Delete User</h1>
                <form action="/deleteUser" method="POST">
                    <p>Are you sure you want to delete this user?</p>
                    <label>First name:</label>
                    <label>${user.FirstName}"</label>
                    <label>Last name:</label>
                    <label>${user.LastName}"</label>
                    <label>Age:</label>
                    <label>${user.Age}"</label>
                    <label>Gender:</label>
                    <label>${user.Gender}"</label>
                    <input type="hidden" name="id" value="${user.Id}" />
                    <button type="submit">Delete</button>

                    <a href="/">Home</a>
                    <a href="/users">User list</a>
                </form>
            `;

            return htmlString;
        });
    }

    @Post('/deleteuser')
    @Redirect('/users', 302)
    async deleteUser(@Body() body): Promise<string> {
        return this.userService.deleteUser(body.id).then(data => {
            const newId = data;

            if (newId > 0) {
                return ``;
            } else {
                return `
                    <p>User not saved :(
                    <a href="/">Home</a>
                    <a href="/users">User list</a>
                `;
            }
        });
    }
}