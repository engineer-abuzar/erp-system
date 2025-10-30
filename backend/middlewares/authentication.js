import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const authentication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET_KEY)

        next()
    } catch {
        console.log("Invalid Token Please Login Again")
        res.json({ message: "Please Login Again" })
    }
}
export default authentication;