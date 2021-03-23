import { User } from './model';
import * as mongoose from 'mongoose';

export class UserService {
    constructor() {}

    async all() {
        let users;
        await User.find({}).then(docs => {
            users = docs;
        }).catch(err => console.log(err) );

        return {status: 200, data: {data: users || {}}};
    }

    async show(id: string) {
        let response;
        await User.findById(id).then(doc => {
            response = doc;
        }).catch(err => console.log(err) );
        if (!response)
            return {
                status: 404,
                data: {
                    "error": { "message": "User Not found", "code": 404 }
                }
            };

        return {status: 200, data: {data: response || {}}};
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
                status: 400,
                data: {
                    "error": { "message": "Database error", "code": 400 }
                }
            };
        }

        return {status: 201, data: {data: response}};
    }

    async destroy(id: string) {
        let error;

        await User.deleteOne({_id: mongoose.Types.ObjectId(id)})
            .catch(err => {
                console.log(err);
                error = err;
            });
        if (error)
            return {
                status: 400,
                data: {
                    "error": { 
                        "message": "Database error", 
                        "code": 400,
                        "data": error
                    }
                }
            }

        return {status: 200, data: {message: "User deleted succesfully"}};
    }

    async update(id: string, data) {
        let user;

        await User.findById(id)
            .then(doc => {
                user = doc;
            })
            .catch(err => {
                console.log(err);
            });
        if (!user)
            return {
                status: 404,
                data: {
                    "error": { "message": "User Not found", "code": 404 }
                }
            }

        let response;
        user.set(data);
        await user.save()
            .then(doc => {
                response = doc;
            })
            .catch(err => {
                console.log(err);
            });

        return {status: 200, data: {data: response}};
    }
}