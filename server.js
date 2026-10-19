import app from './src/app.js';
import dotenv from 'dotenv/config'


const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`server started on http://localhost:${PORT}`)
})





















// import express from "express";
// import dotenv from "dotenv/config";
// import fs from "fs/promises";
// import path from "path";

// const PORT = process.env.PORT;
// const app = express();
// const chemin = path.join(process.cwd(), "data", "users.json");

// const data = await fs.readFile(chemin, "utf-8");
// let dataParse = JSON.parse(data);

// app.use(express.json());

// const user = [
//   {
//     //tableau en memoire
//   },
// ];

// app.get("/", (req, res) => {
//   res.send(dataParse);
// });

// app.get("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = dataParse.find((u) => u.id === id);
//   if (!user) {
//     return res.status(404).json({ message: "user not found" });
//   }
//   return res.status(200).json({ message: "user found", user });
// });

// app.post("/users", async (req, res) => {
//   const { name, email, role } = req.body;

//   if (!name || !email || !role) {
//     return res.status(400).json({ message: "Informations manquantes" });
//   }

//   const id = dataParse.length + 1;

//   const newUser = { id, name, email, role };

//   dataParse.push(newUser);

//   await fs.writeFile(chemin, JSON.stringify(dataParse, null, 2), "utf-8");

//   return res.status(201).json({ message: "Created", newUser });
// });

// app.put("/users/:id", async (req, res) => {
//   const id = Number(req.params.id);

//   const user = dataParse.find((u) => u.id === id);

//   if (!user) {
//     return res
//       .status(404)
//       .json({ message: `L'utilisateur avec l'id: ${id}, n'existe pas!` });
//   }

//   const infoUser = req.body;

//   const newDataUser = dataParse.map((u) => {
//     return u.id === id ? { ...u, ...infoUser } : u;
//   });

//   await fs.writeFile(chemin, JSON.stringify(newDataUser, null, 2), "utf-8");

//   return res
//     .status(200)
//     .json({
//       message: "Utilisateur modifié",
//       user: newDataUser.find((u) => u.id === id),
//     });
// });

// app.delete("/users/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const userIndex = dataParse.findIndex((u) => u.id === id);
//   if (userIndex === -1) {
//     return res.status(404).json({ message: `L'utilisateur avec l'id: ${id}, n'existe pas!` });
//   }
//   const deleteUser = dataParse.splice(userIndex,1)[0]

//   await fs.writeFile(chemin, JSON.stringify(dataParse, null, 2), "utf-8");
//   return res.status(200).json({message: "Utilisateur supprimer avec succes!!!",deleteUser})
// });

// app.listen(PORT, () => {
//   console.log(`server started on http://localhost:${PORT}`);
// });
