# TripleTen web_project_around_express

Este proyecto consiste en la creación de una API utilizando Express, una biblioteca de Node.js, 
para la creación de aplicaciones web y APIs. 
La API permitirá gestionar usuarios y tarjetas de una aplicación, proporcionando las siguientes funcionalidades:

* Obtener todos los usuarios.
* Obtener todas las tarjetas.
* Obtener un usuario por ID: En caso de que el usuario no exista, se devolverá un estado de respuesta 404
junto con un mensaje JSON indicando que el ID de usuario no fue encontrado.
* Creación, visualización y eliminación de tarjetas.
* Registro de usuarios y autenticación.
* Actualización del perfil y avatar del usuario.
* Dar like y dislike a las tarjetas.

La API también manejará correctamente las solicitudes para rutas no existentes o no válidas, devolviendo 
un estado de respuesta 404 junto con un mensaje JSON que indica que el recurso solicitado no fue encontrado.

##

El proyecto utiliza las siguientes tecnologías y técnicas:

* **Node.js**
* **Express**
* **JavaScript**
* **fs (File System)**
* **Path**
* **Postman**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Tokens)**
* **Expresiones regulares**
