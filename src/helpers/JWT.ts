const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export class JWTHelper {
    private _secretKey: String;
    private _audience: String;
    private _issuer: String;
    private signOptions: object;

    constructor() {
        this._secretKey = process.env['SECRET_KEY'] || '';
        this._audience = process.env['AUTH_AUDIENCE'] || '';
        this._issuer = process.env['AUTH_ISSUER'] || '';
        this.signOptions = {
            issuer: this._issuer,
            audience: this._audience,
            expiresIn: "8h",
        }
    }

    async sign(user, pass: string) {
        const match = await bcrypt.compare(pass, user.hash);
        
        if(!match)
            throw new Error('Unauthorized');
            
        let token = jwt.sign(
            {
                id: user._id.toString(), 
                email: user.email
            }, 
            this._secretKey, 
            this.signOptions
            );

        return token;
    }

    async verify() {
        
    }

    static async hash(pass: string) {
        const saltRounds = 10;
        let hashedPass;
        await bcrypt.hash(pass, saltRounds).then((hash) => {
            hashedPass = hash;
        });
        return hashedPass;
    }
}