# Whatsapp-templates

HU1: Validación de campos al momento de guardar
Como usuario del gestor de plantillas,
Quiero recibir una alerta si intento guardar una plantilla con campos vacíos,
Para asegurarme de que solo se guarden plantillas completas y evitar errores.

Criterios de Aceptación:
✅ Condición 1: Si el campo de nombre o contenido está vacío, el botón "Guardar" debe mostrar una alerta y no guardar la plantilla.

✅ Condición 2: Si ambos campos tienen contenido válido, la plantilla debe guardarse correctamente en localStorage.

✅ Condición 3: El usuario debe recibir retroalimentación visual clara (como un mensaje o borde rojo) cuando los campos estén vacíos.


HU2: Exportar datos del localStorage en JSON
Como usuario del gestor de plantillas,
Quiero exportar todas mis plantillas en un archivo JSON descargable,
Para respaldar mi información o compartirla con otras personas fácilmente o integrarla a otros sistemas.

Criterios de Aceptación:
✅ Condición 1: Al hacer clic en el botón "Exportar", se debe generar un archivo .json con todas las plantillas almacenadas en localStorage.

✅ Condición 2: El archivo debe tener un nombre descriptivo como plantillas_exportadas.json y contener datos en formato legible (nombre, contenido, fecha, etc.).

✅ Condición 3: El botón debe estar visible y accesible desde la interfaz principal; el usuario debe recibir confirmación visual de que la descarga fue exitosa (por ejemplo, un mensaje breve o tooltip).
