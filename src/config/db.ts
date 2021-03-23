
export class MongoConfig {
    host:string;
    password:string;
    user:any;
    schema:string;
    params:Object;

    constructor(params:any = {}) {
        this.host = process.env['DB_HOST'] || '';
        this.password = process.env['DB_PASSWORD'] || '';
        this.schema = process.env['DB_SCHEMA'] || '';
        this.user = process.env['DB_USER'] || '';
        this.params = params;
    }

    all() {
        let config = {
            host: this.host,
            user: this.user,
            password: this.password,
            schema: this.schema,
            params: this.params,
        };
        return config;
    }

    getStrConnection():string {
        let connectionString = 'mongodb+srv://';
        connectionString += (this.user ? (this.user + ':' + this.password + '@') : '') + this.host + '/' + this.schema;
        return connectionString;
    }

    otherParams() {
        return this.params;
    }
}
