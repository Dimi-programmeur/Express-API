import { httpCode } from "../static/httpCode.js";
import prisma from "../lib/prisma.js";
import { v4 as uuidv4 } from "uuid";

const articlesController = {
  postArticle: async (req, res) => {
    try {
      const { auteur, titre, description } = req.body;
      const userId = req.user.id
      if (!auteur || !titre || !description) {
        return res
          .status(httpCode.BAD_REQUEST)
          .json({ message: "Tous les champs sont requis!" });
      }

      const article = await prisma.article.create({
        data: {
          id: uuidv4(),
          auteur,
          titre,
          description,
<<<<<<< HEAD
          userId: userId
        }
=======
        },
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)
      });

      return res
        .status(httpCode.CREATED)
        .json({ message: "Articles créé avec succès!", article });
    } catch (error) {
<<<<<<< HEAD
        return res.status(httpCode.INTERNAL_SERVER_ERROR).json({message: error.message})
=======
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Erreur du serveur!" });
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)
    }
  },

  getArticles: async (req, res) => {
    try {
<<<<<<< HEAD
        const articles = await prisma.article.findMany({
            orderBy : {postAt: 'desc'},
            include: {commentaire: true}
        })
=======
      const articles = await prisma.article.findMany({
        orderBy: { postAt: "desc" },
      });
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)

      if (articles.length === 0) {
        return res
          .status(httpCode.NOT_FOUND)
          .json({ message: "Aucun article pour le moment!" });
      }

      return res
        .status(httpCode.OK)
        .json({ message: "Liste des articles", articles });
    } catch (error) {
      return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Erreur du serveur!" });
    }
  },
};

export default articlesController;
