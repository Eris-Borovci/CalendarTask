import { decode, sign } from "react-native-pure-jwt"

// This is a simple implementation of JWT for demonstration purposes
// In a real application, we would use a more secure secret and algorithm and store it in .env file
const SECRET = 'secret'
const oneWeekExpirationInMs = 60 * 60 * 1000 * 24 * 7

class JwtUtility {
    static async signJwt(payload: object) {
        const token = await sign({
            ...payload,
            exp: new Date().getTime() + oneWeekExpirationInMs,
        }, SECRET, { alg: 'HS256' })

        return token
    }

    static async decodeJwt(token: string) {
        return await decode(token, SECRET)
    }
}

export default JwtUtility