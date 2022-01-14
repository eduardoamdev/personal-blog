# Mi api personal

<img src="./readme-images/log-in.png" alt="log in"/>

## Descripción:

Se trata de una api que proporciona al fron .nd de mi sitio web toda la información que necesita tomándola de una base de datos MongoDB que se encuentra en Atlas.

Una parte muy importante a destacar dentro de este proyecto de back-end es que contiene una interfaz gráfica desarrollada con Handlebars que permite al administrador modificar la información de la base de datos de una manera sencilla y rápida.
Esta aplicación se encuentra desplegada en https://eblog-api.herokuapp.com/ pero solo puede ser accedida por el administrador ya que requiere de usuario y contraseña para ser utilizada.

La aplicación a la que da servicio se encuentra en la siguiente url: https://eblog-amdev.herokuapp.com/

## Cómo utilizar la aplicación

Una vez estemos logueados tendremos acceso a la pantalla de bienvenida.

<img src="./readme-images/welcome.png" alt="Bienvenida"/>

Como podemos ver, también tenemos acceso a la barra de navegación y, con ello, a las siguientes funcionalidades.

### Info

Nos permite trabajar con la información del "sobre mí" (en inicio), correo de contacto, el título de la página principal y el pie de página.

<img src="./readme-images/info.png" alt="Inicio"/>

#### Inicio

Contiene la información del "sobre mí". Si entramos nos mostrará el texto actual y las opciones de modificar y volver.

<img src="./readme-images/info.png" alt="Sobre mí"/>

Si entramos en modificar nos aparecerá un textárea que nos permitirá modificar el contenido.

<img src="./readme-images/update-about-me.png" alt="Actualizar sobre mí"/>

#### Email

En el apartado de email nos mostrará la información del correo con las opciones de modificar y volver.
No voy a mostrar imágenes de las mismas ya que contienen las claves para trabajar con emailJS.

#### Título

El título de la página principal de la aplicación lo podemos ver en este apartado.

<img src="./readme-images/title.png" alt="Título"/>

Si entramos en modificar podremos modificar el contenido.

<img src="./readme-images/update-title.png" alt="Actualizar título"/>

#### Pie de página

Nos muestra el contenido de nuestro pie de página.

<img src="./readme-images/footer.png" alt="Pie de página"/>

En actualizar podemos cambiar el contenido del mismo.

<img src="./readme-images/update-footer.png" alt="Actualizar pie de página"/>

### Artículos

Este apartado nos mostrará un listado con los artículos almacenados en la base de datos. Aquí tenemos la opción de ver un artículo haciendo click sobre él o bien crear un nuevo artículo para añadir al listado.

<img src="./readme-images/articles.png" alt="Artículos"/>

### Ver artículo

Dentro del detalle del artículo podemos ver el contenido del mismo y acceder a las oopciones de volver a la pantalla anterior, actualizar y eliminar.

<img src="./readme-images/article.png" alt="Artículo"/>

Si entramos en actualizar podremos cambiar el título y el contenido del artículo propiamente dicho.

<img src="./readme-images/update-article.png" alt="Actualizar-artículo"/>

Si pulsamos en eliminar borraremos directamente el artículo de nuestra base de datos.

### Nuevo artículo

Si, estando en artículos, pulsamos en nuevo artículo accedermos a un formulario en el que podremos rellenar el título y el contenido del nuevo artículo que queramos publicar.

<img src="./readme-images/new-article.png" alt="Nuevo-artículo"/>

### Vídeos

Si accedemos a vídeos veremos una lista completa con los títulos de los vídeos de YouTube a los que accederemos desde nuestro front-end. También tenemos la opción de acceder a la información de un vídeo en concreto o de introducir la de uno nuevo.

<img src="./readme-images/videos.png" alt="Vídeos"/>

#### Ver vídeo

En esta pantalla se nos mostraran tanto el título del vídeo como las opciones de actualizar, volver o borrar de nuestra base de datos.

<img src="./readme-images/video.png" alt="Vídeo"/>

Si pulsamos en actualizar veremos la información del vídeo es decir, el título y el id, y la podremos modificar.

<img src="./readme-images/update-video.png" alt="Actualizar-vídeo"/>

Si pulsamos en borrar borraremos la información del vídeo de nuestra base de datos.

#### Nuevo vídeo

Si accedemos a nuevo tutorial podremos ver un formulario que nos servirá para introducir la información de un nuevo vídeo.

<img src="./readme-images/new-video.png" alt="Nuevo-vídeo"/>

### Proyectos

Si accedemos a proyectos veremos una lista completa con los nombres de los proyectos que se encuentran en nuestra base de datos. También tenemos la opción de acceder a la información de un proyecto o insertar la de uno nuevo.

<img src="./readme-images/projects.png" alt="Proyectos"/>

#### Ver proyecto

Aquí accederemos a la descripción del proyecto así como a las opciones de actualizar y eliminar.

<img src="./readme-images/project.png" alt="Proyecto"/>

Si pulsamos en actualizar veremos la información del proyecto es decir, el título, la descripción y la url de GitHub, y la podremos modificar.

<img src="./readme-images/update-project.png" alt="Actualizar-proyecto"/>

Si pulsamos en borrar borraremos la información del proyecto de nuestra base de datos.

#### Nuevo vídeo

Si accedemos a nuevo proyecto podremos ver un formulario que nos servirá para introducir la información de un nuevo proyecto.

<img src="./readme-images/new-project.png" alt="Nuevo-proyecto"/>

### Log out

Si seleccionamos la opción "log out" nuestra sesión se cerrará y seremos devueltos al "log in".

## Puesta en marcha

### Clonar el repositorio:

Copiaremos el repositorio y lo clonaremos utilizando el comando "git clone" seguido del repositorio en el directorio que deseemos.

### Instalación de paquetes:

El proyecto consta de tres directorios: benefit-api, benefit-customer y benefit-owner. Debemos entrar en cada uno de ellos y ejecutar el comando "npm i" para instalar los paquetes correspondientes.

### Primeros pasos para arrancar en local conectando con Atlas y ajuste de algunos detalles:

  - #### Crear un archivo .env y declarar las variables de entorno:

    Crearemos un archivo .env en el directorio raíz de nuestro proyecto.  
    Dentro del archivo .env declararemos nuestras variables de entorno que serán las siguientes:
      - PORT=3001
      - DB_SESSION=< Aquí irá nuestro usuario >
      - DB_PASSWORD=< Aquí irá la contraseña de nuestra base de datos >
      - DB_NAME=< Nombre de la base de datos >

  - #### Cambiaremos el "missing credentials" del inicio de sesión por un mensaje en castellano:

    Nos dirigiremos al directorio node_modules de nuestro proyecto y, dentro de la carpeta passport-local entramos en el directorio lib y abrimos el archivo strategy.js.  
    Una vez allí nos dirigiremos a la línea 75 y, donde pone "missing credentials" escribiremos el mensaje que deseemos que aparezca cada vez que falte alguna de las credenciales necesarias para iniciar la sesión.

  - #### Levantar el servidor:

    Abriremos el intérprete de comandos y, desde la raíz de nuestro proyecto, ejecutaremos el comando "npm run dev".

  - #### Abrir la aplicación:

    Abriremos nuestro navegador y, en la barra de direcciones, escribiremos "localhost:3001".

## Tecnologías empleadas

### Express

Express es un paquete de software de NodeJS que nos permite levantar un servidor de manera sencilla.

### Mongoose

Mongoose nos permite interactuar con una base datos MongoDB por medio de los modelos.

### Dotenv

Dotenv nos va a permitir crear un documento con variables de entorno que serán accesibles desde cualquier documento de la API.

### Bcrypt

Este módulo sirve para convertir la contraseña en claro que nos llega del cliente en un hash que podamos guardar en nuestra base de datos.

### Passport

Passport es un conjunto de librerías que nos permiten gestionar el acceso de los usuarios.

## ¿Qué me ha aportado este proyecto?

Esta API ha resultado bastante completa ya que contiene todas las tecnologías de back-end necesarias como son NodeJS, Express y MongoDB y, además, incluye renderizado de plantillas con Handlebars para crear una interfaz de usuario y no tener que hacer las modificaciones directamente en la base de datos.
Personalmente, su desarrollo me ha servido para asentar mejor mis conocimientos y hacer un repaso profundo de todas estas tecnologías..