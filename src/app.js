<<<<<<< HEAD
import express from 'express'
import userRoutes from './routes/user.route.js'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import articleRoute from './routes/articles.route.js'
import commentRoute from './routes/comment.route.js'
import cors from 'cors'




const app = express()
=======
import express from "express";
import userRoutes from "./routes/user.route.js";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import articleRoute from "./routes/articles.route.js";
import cors from "cors";

const app = express();
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  limit: 100, //100 requetes max
  message: { error: "Trop de requete depuis cette adresse IP" },
});

// middleware
<<<<<<< HEAD
app.use(express.json())
app.use(morgan('tiny'))
app.use(limiter)
app.use(cors({
    origin: 'http://localhost:5173',
}))

app.use((req, res, next)=>{
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups" )
    next()
})


// routing
app.use('/api/auth', userRoutes)
app.use('/api', articleRoute)
app.use('/api/comment', commentRoute)
=======
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); //Utile pour destructurer les donnees dans le body en json
app.use(morgan("tiny"));
app.use(limiter);

// routing
app.use("/api/auth", userRoutes);
app.use("/api", articleRoute);
>>>>>>> 855fd6d (feat: ajout de la route /google pour connexion avec compte google...)

export default app;
