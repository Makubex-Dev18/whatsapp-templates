import { store } from "./store.js";
import { saveTemplates } from "./persistence.js";

const form = document.getElementById("template-form");
const nameInput = document.getElementById("template-name");
const messageInput = document.getElementById("template-message");
const templatesList = document.getElementById("templates-ul");
const previewOutput = document.getElementById("preview-output");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

function renderTemplates() {
  templatesList.innerHTML = "";

  store.getState().templates.forEach((template) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${template.name}</strong>: ${template.message}
      <button data-id="${template.id}" class="edit-btn">Editar</button>
      <button data-id="${template.id}" class="delete-btn">Eliminar</button>
    `;
    templatesList.appendChild(li);
  });

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      store.dispatch({ type: "DELETE_TEMPLATE", payload: id });
      saveTemplates(store.getState().templates);
      renderTemplates();
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const template = store.getState().templates.find((t) => t.id === id);
      if (template) {
        nameInput.value = template.name;
        messageInput.value = template.message;
        previewOutput.innerText = template.message;
        store.dispatch({ type: "START_EDITING", payload: id });
        cancelEditBtn.style.display = "inline-block";
      }
    });
  });
}

function clearForm() {
  nameInput.value = "";
  messageInput.value = "";
  previewOutput.innerText = "";
  store.dispatch({ type: "CANCEL_EDITING" });
  cancelEditBtn.style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const editingId = store.getState().editingId;
  if (editingId) {
    store.dispatch({
      type: "UPDATE_TEMPLATE",
      payload: { id: editingId, name, message },
    });
  } else {
    store.dispatch({
      type: "ADD_TEMPLATE",
      payload: { name, message },
    });
  }

  saveTemplates(store.getState().templates);
  renderTemplates();
  clearForm();
});

cancelEditBtn.addEventListener("click", clearForm);

// Vista previa en tiempo real
messageInput.addEventListener("input", () => {
  previewOutput.innerText = messageInput.value;
});

renderTemplates();
