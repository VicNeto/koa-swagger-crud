import { User } from './model';

export class UserService {
    constructor() {}

    async all() {
        let users;
        await User.find({}).then(docs => {
            users = docs;
        }).catch(err => console.log(err) );

        return {status: 200, data: {data: users}};
    }

    async index(id: string) {
        let response;
        await User.findById(id).then(doc => {
            response = doc;
        }).catch(err => console.log(err) );

        return {status: 200, data: {data: response}};
    }

    async store(data) {
        const user = new User(data);
        let response;
        
        await user.save()
            .then(doc => {
                response = doc;
            })
            .catch(err => {
                console.log(err);
            });
        if (!response) {
            return {
                status: 500,
                data: {
                    "error": { "message": "Database error", "code": 500 }
                }
            };
        }

        return {status: 201, data: {data: response}};
    }
}