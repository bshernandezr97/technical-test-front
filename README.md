##TechnicalTest

Para desplegar el ambiente de desarrollo debes clonar el repositorio y ejecutar "npm i" en la carpeta del proyecto para instalar las dependencias necesarias.

Debes configurar las variables de entorno para evitar errores de conexión con el backend, en el caso de develop, la uri del backend es http://localhost:8081/api, por defecto, pero para el despliegue en heroku debes asociar la uri que te brinda heroku al crear el proyecto.

Para correr el proyecto en ambiente de desarrollo solo debes ejecutar npm start y asegurarte de que el backend este corriendo para evitar errores de conexión.

Para subir el proyecto junto con el backend a heroku debes ejecutar "npm run build" y copiar los archivos generados dentro de la carpeta /build al directorio /public en el carpeta en donde esta alojado el backend.