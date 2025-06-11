import { loadTemplates } from './persistence.js';
import { createTemplate } from './models/models.js';

const initialState = {
  templates: loadTemplates(),
  editingId: null
};

export const store = {
  state: { ...initialState },

  getState() {
    return this.state;
  },

  dispatch(action) {
    switch (action.type) {
      case 'ADD_TEMPLATE':
        const newTemplate = createTemplate(action.payload.name, action.payload.message);
        this.state.templates.push(newTemplate);
        break;

      case 'UPDATE_TEMPLATE':
        this.state.templates = this.state.templates.map(template =>
          template.id === action.payload.id
            ? { ...template, name: action.payload.name, message: action.payload.message }
            : template
        );
        this.state.editingId = null;
        break;

      case 'DELETE_TEMPLATE':
        this.state.templates = this.state.templates.filter(t => t.id !== action.payload);
        break;

      case 'START_EDITING':
        this.state.editingId = action.payload;
        break;

      case 'CANCEL_EDITING':
        this.state.editingId = null;
        break;

      default:
        console.warn('Acción desconocida:', action.type);
    }
  }
};
