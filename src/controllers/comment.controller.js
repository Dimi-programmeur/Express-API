import prisma from "../lib/prisma.js";
import { httpCode } from "../static/httpCode.js";
import { v4 as uuidv4 } from 'uuid';


const commentController = {
    createComment: async(req, res)=>{

        try {
            const {articleId, content} = req.body
            
            if (!articleId || !content) {
                return res.status(httpCode.BAD_REQUEST).json({message: 'Tous les champs sont requis'}) 
            }

            const articleExist = await prisma.article.findUnique({
                where: {id: articleId}
            })

            if (!articleExist) {
                 return res.status(httpCode.NOT_FOUND).json({message: 'Article introuvable'}) 
            }

            const newComment = await prisma.commentaire.create({
                data: {
                    id: uuidv4(),
                    content,
                    articleId,
                    userId: req.user.id
                },
                include: {
                    user: {select: {name: true, role: true}}
                }
            })

            return res.status(httpCode.CREATED).json({message: 'Commentaire publie avec success', newComment}) 


        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({message:"Erreur du serveur!"})   
        }

    },

    getCommentByArticle: async(req, res)=>{
        try {
            const { articleId } = req.params

        const articleExist = await prisma.article.findUnique({
                where: {id: articleId}
        })

        if (!articleExist) {
             return res.status(httpCode.NOT_FOUND).json({message: 'Article introuvable'}) 
        }

        const comments = await prisma.commentaire.findMany({
            where: {articleId},
            include: {
                user: {select : {name: true}}
            },
            orderBy: {postAt: 'desc'}
        })

        if (!comments) {
            return res.status(httpCode.NOT_FOUND).json({message: 'Aucun commntaire trouve pour cette article'}) 
        }

        return res.status(httpCode.OK).json({message: 'Liste des commentaires de cette article', comments}) 

        } catch (error) {
            return res.status(httpCode.INTERNAL_SERVER_ERROR).json({message:"Erreur du serveur!"})   
        }
        
    }

}

export default commentController