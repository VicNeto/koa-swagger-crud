import { User } from '../models/User';
import * as mongoose from 'mongoose';
import { JWTHelper as jwt } from '../helpers/JWT';

export class UserService {
    constructor() {}

    async all() {
        let users;
        await User.find({removed: null}).then(docs => {
            users = docs;
        }).catch(err => console.log(err) );
        users = users.map(user => this.parseResponse(user));

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

        return {status: 200, data: {data: this.parseResponse(response) || {}}};
    }

    async store(data) {
        data.hash = await jwt.hash(data.password);
        const user = new User(data);
        let response, error;
        
        await user.save()
            .then(doc => {
                response = doc;
            })
            .catch(err => {
                console.log(err);
                error = err;
            });
        if (!response) {
            return {
                status: 400,
                data: {
                    "error": { "message": "Bad request", "code": 400 , "data": error}
                }
            };
        }

        return {status: 201, data: {data: this.parseResponse(response)}};
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

        let response, error;
        user.set(data);
        await user.save()
            .then(doc => {
                response = doc;
            })
            .catch(err => {
                console.log(err);
                error = err;
            });
        if (error)
            return {
                status: 400,
                data: {
                    "error": { "message": "Unkown error", "code": 400 }
                }
            }

        return {status: 200, data: {data: this.parseResponse(response)}};
    }

    private parseResponse(data) {
        return {
            _id: data?._id,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email,
            nickName: data?.nickName,
            type: data?.type,
            createdAt: data?.createdAt,
        }
    }
}