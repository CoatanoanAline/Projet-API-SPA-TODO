import { Task } from "../models/Task.js";



export async function getAllTasks(req, res) {
  
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des tâches" });
  }
}

export async function createTasks(req, res) {
  try {
    const createdTask = await Task.create({
      name: req.body.name,
    });
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur serveur" });
  }
}

export async function editTask(req, res) {

    const taskId = parseInt(req.params.id);
    const { name } = req.body;

  try {
    //trouver la tâche par son Id
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    //Mettre à jour la tâche 
    task.name = name;
    await task.save();


    // Retourner la tâche mise à jour en réponse
    res.status(200).json(task);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour de la tâche" });
  }
}

export async function deleteTask(req, res) {

  try {
    const idToDelete = parseInt(req.params.id); // Renommez la variable pour éviter le conflit
    const taskToDelete = await Task.findByPk(idToDelete);

    if (!taskToDelete) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    await taskToDelete.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression de la tâche" });
  }
}


