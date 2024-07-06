# O'todo

## Présentation

Salut à toi jeune entrepreneur ! Alors, si aujourd'hui on se permet de te contacter, c'est pour une raison très simple. Michel, notre dev, a commencé un projet super important et est parti en nous laissant en plan 😭. Nous avons besoin de toi pour le terminer !

Je t'explique, c'est une application de `Todo-list` découpée en 2 parties :
- un front fait en HTML/CSS(bulma)/JS ;
- une API avec Express et Sequelize.

D'après les infos qu'on a, il a quand même eu le temps d'avancer sur certaines choses :
- Front : le HTML/CSS est fait, le JS est bien avancé mais il manque les appels à l'API.
- Back : la base `Express` est là, les modèles ont été créés mais il manque les routes.

Et, professionnel comme il est, notre dev a laissé une **documentation** ainsi qu'une **roadmap** que je te laisse découvrir.

Pour des raisons de practicité pour ce parcours, le dépot contient **2 projets** : 
- un dossier `front` qui contient le HTML/CSS/JS client.
- un dossier `back` qui contient l'API qui fournira au front des routes pour contacter la BDD.

## Documentation

### Base de données

On commence par **créer un utilisateur et une nouvelle base de données** dans `Postgres` à l'aide de `psql` : 
- nom de l'utilisateur : `otodo` ;
- mot de passe de l'utilisateur : `otodo` ;
- nom de la base de données : `otodo`.

Si besoin, utiliser la [fiche récap' Kourou](https://kourou.oclock.io/ressources/objectifs/creer-une-nouvelle-base-de-donnee-sur-postgresql/).

### Démarrer le serveur API (`back`)

- S'assurer d'être placer dans le **dossier `back`** pour effectuer les commandes : 
  - `cd back`
- Créer un fichier d'environnement `.env` à partir du fichier `.env.example` :
  - `cp .env.example .env`
  - ajuster les variables d'environnement si besoin
- Installer les dépendances du backend :
  - `npm install`
- Exécuter le script de création des tables et d'échantillonnage de la base de données : 
  - `npm run db:reset`
  - vérifier dans Postgres via `psql` la bonne exécution du script si besoin, en observant les tables et données créées.
- Démarrer le serveur de développement : 
  - `npm run dev`
  - penser à tester son API à l'aide d'`Insomnia` ou d'un autre client HTTP.  La route `GET /tasks` devrait renvoyer un tableau vide.

### Démarrer le serveur SPA (`front`)

**Sans quitter le terminal du backend, ouvrir un nouveau terminal** !

- Se placer dans le dossier `front` :
  - `cd front`
- Installer les dépendances du frontend : 
  - `npm install`
- Démarer le serveur de developpement (`Vite`):
  - `npm run dev`

## Roadmap

Voici les routes API à implémenter au **fur et à mesure** des étapes du projet :

| **Route**    | **Méthode** | **Action**                   | **Données renvoyées**  |
| ------------ | ----------- | ---------------------------- | ---------------------- |
| `/tasks`     | `GET`       | Récupère la liste des tâches | Tableau de tâches      |
| `/tasks`     | `POST`      | Ajoute une nouvelle tâche    | Tâche créée            |
| `/tasks/:id` | `PATCH`     | Modifie une tâche            | Tâche modifiée         |
| `/tasks/:id` | `DELETE`    | Supprime une tâche           | Aucune donnée renvoyée |

Voici les récits utilisateur à implémenter au **fur et à mesure**  des étapes du projet : 

| **En tant que** | **Je souhaite pouvoir** | **Afin de**                       |
| --------------- | ----------------------- | --------------------------------- |
| Utilisateur     | voir ma liste de tâches | m'organiser                       |
| Utilisateur     | créer une tâche         | l'ajouter à ma liste              |
| Utilisateur     | modifier une tâche      | corriger mes erreurs potentielles |
| Utilisateur     | supprimer une tâche     |                                   |

## Etapes 

### Étape 1 - Backend

Compléter la route `GET /tasks` afin qu'elle renvoie la liste des tâches présentes en base de données au format JSON.

> Psssst : ça se passe dans le fichier `back/app/controllers/tasks.js`.

### Étape 2 - Frontend

Compléter la fonction `fetchAndInsertTasks()` en suivant les instructions fournies en commentaire, afin de récupérer les tâches depuis l'API puis de les insérer dans la page.

> Psssst : ça se passe dans le fichier `front/assets/js/tasks.js`

Pour info, cette fonction est appelée par la fonction `init()` du fichier `front/assets/js/app.js`. On pourra à la même occasion, retirer les instructions qui insèrent les fausses données.

### Étape 3 - Backend

Créer une route `POST /tasks` pour ajouter une tâche : 
- le `body` attendu correspond à la tâche à créer, est au format JSON suivant : `{ "name": "..." }` ;
- la route renvoie la tâche créée.

Penser à tester cette route à l'aide d'un client HTTP (par exemple Insomnia).

### Étape 4 - Frontend

Appeler la route `POST /tasks` depuis la fonction `handleCreateForm()` afin de gérer l'ajout de nouvelles tâches par l'utilisateur.

### Étape 5 - Backend

Créer une route `PATCH /tasks/:id` pour modifier une tâche afin de pouvoir modifier le nom de la tâche.

Cette route accepte un nouveau nom pour la tâche et doit renvoyer la tâche fraichement modifiée.

### Étape 6 - Frontend

Appeler la route `PATCH /tasks/:id` depuis la fonction `handleEditForm()` afin de gérer l'édition d'une tâche par l'utilisateur.

### Étape 7 -  Backend

Créer la route `DELETE /tasks/:id` pour supprimer une tâche. 

> Note : la réponse ne renvoie aucune donnée au client et le statut de la réponse doit être `204` (`No content`).

### Étape 8 - Frontend

Appeler la route `DELETE /tasks/:id` depuis la fonction  `handleDeleteButton()` afin de gérer la suppression d'une tâche par l'utilisteur

## Des bonus à foison

### Bonus "rapides"

- (Front) Réinitialiser le formulaire après l'ajout d'une tâche.
- (Back) Éviter les crash serveurs en ajoutant des `try-catch` adaptés dans les controlleurs.

### Bonus "plus long"

- (Front) Ajouter un message après la suppression d'une tâche "La tâche a bien été supprimée" (pour la mise en forme : https://bulma.io/documentation/elements/notification/)

- (Back + Front) Améliorer la gestion des erreurs :
  - s'assurer que l'utilisateur ne puisse pas créer une tâche avec un nom vide
  - s'assurer que l'utilisateur soit prévenu en cash de problème serveur (par exemple, route `GET /tasks` inaccessible)

