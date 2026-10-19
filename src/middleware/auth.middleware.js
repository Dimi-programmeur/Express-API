import jwt from 'jsonwebtoken'
import { httpCode } from '../static/httpCode.js'


const authMiddleWare = (req, res, next)=>{
    try {
        const tokenHeader = req.headers.authorization
        if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
            return res.status(httpCode.UNAUTHORIZED).json({message: 'Token manquant ou mal ecrit'})
        }
        const token = tokenHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = decoded

        next()

    } catch (error) {
        return res.status(httpCode.UNAUTHORIZED).json({message: 'Token expiré'})
    }
}

export default authMiddleWare