import { apiBaseUrl } from "./config.js";
import { getTasks, postTask, patchTask, deleteTask } from "./api.js";


// Récupérer les tâches
export async function fetchAndInsertTasks() {
  // Récupérer les listes via l'API à l'aide de la fonction `fetch()`
  const tasks = await getTasks();
  // Boucler sur la liste des tâches
  if (!tasks) {
    alert("Une erreur est survenue. Réessayez plus tard.");
    return;
  }
  // Pour chaque tâche, l'insérer dans la page à l'aide de la fonction `insertTaskInHTML()`
  tasks.reverse().forEach(insertTaskInHTML);
}

/**
 * Insert une tâche dans le DOM
 * @param {Object} taskData - L'objet représentant la tâche
 * @param {number} taskData.id - L'id de la tâche
 * @param {string} taskData.name - Le nom de la tâche
 * @example insertTaskInHTML({ id: 1, name: "Faire les courses"}); // Affiche une tâche dans la page
*/

// insérer une tâche
export function insertTaskInHTML(taskData) {
  // On récupère le HTML d'une tâche dans le template
  const taskTemplate = document.querySelector('.template-task');
  const newTask = document.importNode(taskTemplate.content, true);

  // On insère les données de la tâche dans le HTML
  newTask.querySelector('.task__name').textContent = taskData.name;
  newTask.querySelector('.task__input-name').value = taskData.name;
  newTask.querySelector('.task__input-id').value = taskData.id;
  newTask.querySelector('.task').dataset.id = taskData.id;

  // On écoute les événements sur les éléments créés
  newTask
    .querySelector('.task__delete')
    .addEventListener('click', handleDeleteButton);
    
  newTask
    .querySelector('.task__edit')
    .addEventListener('click', handleEditButton);

  newTask
    .querySelector('.task__edit-form')
    .addEventListener('submit', handleEditForm);

  // On insère le HTML de la tâche dans la page
  document.querySelector('.tasks').append(newTask);
}

// créer une tâche
export async function handleCreateForm(event) {
  event.preventDefault();
  
  const addTaskForm = event.currentTarget;
  const taskFormData = Object.fromEntries(new FormData(addTaskForm));
 
  const createdTask = await postTask(taskFormData);

  if (!createdTask) {
    alert("Une erreur est survenue. Réessayez plus tard.");
  } else {
    insertTaskInHTML(createdTask);
  }

  addTaskForm.reset();
}

// Supprimer une tâche
export async function handleDeleteButton(event) {
  const taskHtmlElement = event.currentTarget.closest('.task');
  const taskId = parseInt(taskHtmlElement.dataset.id);

  try {
    // Envoyer la requête DELETE à l'API
    const httpResponse = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!httpResponse.ok) {
      throw new Error(`Erreur HTTP: ${httpResponse.status}`);
    }

    // Si la suppression côté serveur est réussie, supprimer l'élément dans la page HTML
    taskHtmlElement.remove();

    console.log(`Tâche avec l'ID ${taskId} supprimée avec succès.`);
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    // Gérer l'erreur côté client (par exemple, afficher un message d'erreur à l'utilisateur)
    alert("Une erreur est survenue lors de la suppression de la tâche. Réessayez plus tard.");
  }

}

// bouton de la tâche à Modifier
export function handleEditButton(event) {
  // On récupére l'élément HTML de la tâche à modifier
  const taskHtmlElement = event.currentTarget.closest('.task');
  // On affiche l'input de modification
  taskHtmlElement.querySelector('.task__edit-form').style.display = 'flex';
  // On masque le titre
  taskHtmlElement.querySelector('.task__name').style.display = 'none';
}

// Modifier la tâche
export async function handleEditForm(event) {
  // Bloquer l'envoie du formulaire
  event.preventDefault();

  // On récupère l'élément HTML complet de la tâche à modifier
  const taskHtmlElement = event.currentTarget.closest('.task');

  // Récupérer les données du formulaire
  const editTaskForm = event.currentTarget;
  const editTaskFormData = new FormData(editTaskForm);
  const newName = editTaskFormData.get("name"); // Le nouveau nom récupéré
  const taskId = editTaskFormData.get("id"); // L'ID de la tâche à modifier


  const updatedTask = await patchTask(taskId, { name: newName });

    if (!updatedTask) {
      throw new Error('Erreur lors de la mise à jour de la tâche');
    }

  // Mettre à jour l'interface utilisateur avec le nouveau nom de la tâche
  taskHtmlElement.querySelector('.task__name').textContent = updatedTask.name;

  // Après confirmation de l'API modifier le nom de la tâche dans le span.task__name
  editTaskForm.reset();
  // On affiche l'input de modification
  taskHtmlElement.querySelector('.task__edit-form').style.display = 'none';
  // On masque le titre
  taskHtmlElement.querySelector('.task__name').style.display = 'block';
}
