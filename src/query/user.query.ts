import { UserDto } from "src/dto/user.dto";

const mysql = require('mysql2');

export class UserQuery {
    private mysqlPool: any
    
    constructor() {
        this.mysqlPool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Semaphore@123',
            database: 'dbhrms',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }).promise();
    }

    async getUserList(): Promise<[]> {
        const [data] = await this.mysqlPool.execute(`SELECT * FROM users`);
        return data;
    }

    async getUserDetails(id): Promise<[]> {
        const [data] = await this.mysqlPool.execute(`SELECT * FROM users WHERE Id = ?`, [id]);
        return data;
    }

    async saveUse(id: number, firstName: string, lastName: string, age: number, gender: string): Promise<number> {
        if (id == 0) {
        const [data] = await this.mysqlPool.execute(`
            INSERT INTO users (FirstName, LastName, Age, Gender) VALUES (?, ?, ?, ?)`,
                [firstName, lastName, age, gender]);
    
            return parseInt(data.insertId);
        } else {
            const [data] = await this.mysqlPool.execute(`
            UPDATE users SET FirstName = ?, LastName = ?, Age = ?, Gender = ? WHERE Id = ?`,
                [firstName, lastName, age, gender, id]);
    
            return parseInt(data.affectedRows) > 0 ? id : 0;
        }
    }

    async deleteUser(id: number): Promise<number> {
        const [data] = await this.mysqlPool.execute(`
        DELETE FROM users WHERE Id = ?`, [id]);

        return parseInt(data.affectedRows) > 0 ? id : 0;
    }
}