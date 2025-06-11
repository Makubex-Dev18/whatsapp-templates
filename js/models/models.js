import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export function createTemplate(name, message) {
  return {
    id: uuidv4(),
    name,
    message
  };
}
