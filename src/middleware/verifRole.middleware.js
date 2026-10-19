import { httpCode } from "../static/httpCode.js";

const verifRole = (req, res, next)=>{
    if (!req.user) {
        return res.status(httpCode.UNAUTHORIZED).json({message: "Vous n'estes pas authentifie"})
    }

    if (req.user.role !== 'ADMIN') {
        return res.status(httpCode.FORBIDDEN).json({message: 'Route reservée aux admins'})
    }

    next()
}

export default verifRole