import { useState, useEffect } from "react";

function App() {
  // État pour stocker les tâches
  const [tasks, setTasks] = useState([]);
  // État pour gérer le texte de la nouvelle tâche
  const [newTask, setNewTask] = useState("");
  // État pour gérer les modifications de tâches en cours d'édition
  const [editTask, setEditTask] = useState({ id: null, text: "" });

  // Effet secondaire pour récupérer les tâches lors du premier rendu du composant
  useEffect(() => {
    getTasks();
  }, []);

  // Fonction pour récupérer les tâches depuis le serveur
  const getTasks = async () => {
    const response = await fetch("/api/tasks");
    if (response.ok) {
      // Met à jour l'état avec les tâches récupérées
      const tasks = await response.json();
      setTasks(tasks);
    } else {
      console.error("Failed to fetch tasks:", await response.text());
    }
  };

  // Fonction pour créer une nouvelle tâche
  const createTask = async () => {
    if (newTask.trim() === "") return; // Ignore si le texte de la tâche est vide
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTask, status: "pending" }), // Envoie le texte et le statut de la nouvelle tâche
    });
    if (response.ok) {
      // Réinitialise le texte de la nouvelle tâche et récupère la liste des tâches mises à jour
      setNewTask("");
      getTasks();
    } else {
      console.error("Failed to create task:", await response.text());
    }
  };

  // Fonction pour vérifier si un ID est au format valide pour MongoDB
  const isValidId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  // Fonction pour modifier une tâche existante
  const modifyTask = async (id) => {
    if (!isValidId(id)) {
      console.error("Invalid ID format");
      return;
    }

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: editTask.text }), // Envoie le texte mis à jour de la tâche
    });

    if (response.ok) {
      // Réinitialise l'état d'édition et récupère la liste des tâches mises à jour
      setEditTask({ id: null, text: "" });
      getTasks();
    } else {
      console.error("Update failed:", await response.text());
    }
  };

  // Fonction pour supprimer une tâche
  const removeTask = async (id) => {
    if (!isValidId(id)) {
      console.error("Invalid ID format");
      return;
    }

    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (response.ok) {
      // Récupère la liste des tâches mises à jour après suppression
      getTasks();
    } else {
      console.error("Failed to delete task:", await response.text());
    }
  };

  // Fonction pour afficher les tâches sous forme de liste
  const displayTasks = () => {
    return tasks.map((taskItem) => (
      <li
        key={taskItem._id}
        className="flex justify-between items-center p-2 border-b border-gray-200"
      >
        <span>
          {taskItem.text}, status: {taskItem.status}
        </span>
        <div>
          <button
            className="px-2 py-1 rounded mr-2"
            onClick={() => setEditTask({ id: taskItem._id, text: taskItem.text })}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 rounded"
            onClick={() => removeTask(taskItem._id)}
          >
            Delete
          </button>
        </div>
      </li>
    ));
  };

  return (
    <main className="container mx-auto p-4 flex justify-center">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4 m-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="border rounded p-2 w-full"
        />
        <button className="px-4 py-2 rounded mt-2" onClick={createTask}>
          Add Task
        </button>
      </div>
      <ul className="list-disc pl-5">{displayTasks()}</ul>
      {editTask.id && (
        <div className="mt-4">
          <input
            type="text"
            value={editTask.text}
            onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
            placeholder="Update task"
            className="border rounded p-2 w-full"
          />
          <button
            className="px-4 py-2 rounded mt-2"
            onClick={() => modifyTask(editTask.id)}
          >
            Update Task
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
