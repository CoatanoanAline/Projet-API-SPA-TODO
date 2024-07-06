import { Router } from "express";
import * as taskController from "./controllers/task.js";

export const router = Router();

// Route pour la liste des taches
router.get("/tasks", taskController.getAllTasks);

// Route pour ajouter une tache
router.post("/tasks", taskController.createTasks);

// Route pour modifier une tache
router.patch("/tasks/:id", taskController.editTask);

// Route pour supprimer une tache
router.delete("/tasks/:id", taskController.deleteTask);
