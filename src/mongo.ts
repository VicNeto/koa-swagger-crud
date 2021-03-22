const mongoose = require('mongoose');

export class Mongo {
    config:any;
    connection:any;
    
    constructor(config) {
        this.config= config;
    }
   
    connect() {
        const url=this.config.getStrConnection();
        
        mongoose.connect(url,this.config.otherParams()).then((connection:any)=>{
           connection.set('debug', process.env.NODE_ENV === 'dev');
           mongoose.set('useFindAndModify', false);
        });
        mongoose.connection.on('connected', function () {
            console.log( '\x1b[32m'  + `Mongoose default connection `);
        });
        mongoose.connection.on('error',function (err:any) {
            console.error('Mongoose default connection error: ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.error('Mongoose default connection disconnected');
        }); 
        this.connection=mongoose;
    }
    close() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection closed through app termination');
            process.exit(0);
        });
    } 
}
