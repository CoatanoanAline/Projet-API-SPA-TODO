import { apiBaseUrl } from "./config.js";



export async function getTasks() {
    try {
  
      const httpResponse = await fetch(`${apiBaseUrl}/tasks`);
  
      if (!httpResponse.ok) { // Si le serveur répond avec une 4XX ou 5XX
        console.log(httpResponse);
        return null; // retourner null pour que le "list.module.js" gère l'erreur
      }
  
      // Sinon, tout s'est bien passé, on peut parser le json
      const staks = await httpResponse.json(); // [{}, {}, {}]
      return staks;
  
    } catch (error) { // Si le serveur ne répond pas (Fail to Fetch)
  
      console.error(error);
      return null; // retourner null pour que le "list.module.js" gère l'erreur
  
    }
}
  
export async function postTask(taskFormData) {
    // Envoyer les données à l'API
    try {
  
      const httpResponse = await fetch(`${apiBaseUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskFormData)
      });
    
    // Gestion d'erreur
    if (!httpResponse.ok) {
      console.log(httpResponse);
      return null;
    }
  
    // Récupérer la réponse de l'API
    const createdTask = await httpResponse.json();
    // retourner la réponse
    return createdTask;
  
    } catch (error) {
      console.error(error);
      return null;
    }
}

export async function patchTask(taskId, newData) {
    // Envoyer les données à l'API
    try {
  
      const httpResponse = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    
    // Gestion d'erreur
    if (!httpResponse.ok) {
      console.log(httpResponse);
      return null;
    }
  
    // Récupérer la réponse de l'API
    const updatedTask = await httpResponse.json();
    // retourner la réponse
    return updatedTask;
  
    } catch (error) {
      console.error(error);
      return null;
    }
}

export async function deleteTask(taskId) {
  // Envoyer les données à l'API
  try {

    const httpResponse = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (! httpResponse.ok) {
      console.log(httpResponse);
      return false;
    }

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}