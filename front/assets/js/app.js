import * as taskManager from "./task.js";


document.addEventListener("DOMContentLoaded", init);


async function init() {
  // Ajout de données de test ici. [TODO] À SUPPRIMER lorsqu'on aura fait les appels API.
  taskManager.insertTaskInHTML({ id: 1, name: "Créer le HTML" });
  taskManager.insertTaskInHTML({ id: 2, name: "Créer le CSS" });

  // Fetch et afficher les tâches
  await taskManager.fetchAndInsertTasks();

  // Ecouter la soumission du formulaire d"ajout de tâche
  const createTaskForm = document.querySelector("#create-task");
  createTaskForm.addEventListener("submit", taskManager.handleCreateForm);
}