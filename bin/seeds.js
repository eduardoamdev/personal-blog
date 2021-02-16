require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user");
const PersonalInfo = require("../models/personalInfo");
const Article = require("../models/article");

const bcrypt = require("bcrypt");

mongoose
  .connect(`mongodb://localhost/${process.env.DB_CONFIG}`, {
    useNewUrlParser: true
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

let user = process.env.USER;
let pass = process.env.PASS;

const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(pass, salt);

let users = [
  {
    username: user,
    password: hashPass,
  },
];

let infoArray = [
  {
    type: "presentation",
    text:
      "Mi nombre es Eduardo Álvarez. Estudié un técnico superior en mantenimiento de sistemas electrónicos he trabajado durante años reparando averías y haciendo mantenimientos preventivos de diferentes equipos. Durante mi tiempo libre (si es que puede llamarse así a la parte del día que paso fuera del trabajo) me dedico al diseño de sitios web como pueden ser blogs, aplicaciones de gestión o videojuegos. Muchas veces me preguntan por qué le dedico tanto tiempo a mi formación y al conocimiento del mundo de internet. La respuesta es sencilla: me apasiona. Además, esto te tiene que gustar. La tecnología, especialmente en lo que respecta a la informática, se encuentra en continua transformación, por lo que aquellos que estamos inmersos en ella nos vemos obligados a estar permanentemente aprendiendo. Nunca me hubiera imaginado, cuando empezé a escribir mis primeros scripts en C++, que la creación de proyectos se iba a convertir en un modo de vida para mí. Desde el siempre me han llamado la atención la lógica y la programación. Comencé con los autómatas programables en pequeños proyectos que consistían en detectar señales procedentes de sensores frente a las que se encendían leds o se activaban zumbadores. La verdad es que me gustaba mucho e incluso llegué a crear algún proyecto un poco más serio pero la realidad es que no me terminaba de entusiasmar lo que estaba haciendo. Con el paso del tiempo descubrí el desarrollo web. Lo que más me llamaba la atención era que tenía la posibilidad de crear proyectos con una inversión casi nula y de manera accesible ya que solo necesitaba una computadora y conexión a internet. De esta manera descubrí el lenguaje de marcado HTML, las hojas de estilos CSS, Javascript y empezé a engancharme. En aquel entonces no era consciente de que mis conocimientos no eran más que la punta del iceberg en toda la ruta de aprendizaje que debía de seguir si quería completar proyectos serios.  El mundo de los servidores, las bases de datos y los diferentes frameworks y librerías que se encuentran a nuestra disposición es tan amplio que abruma y te hace sentir como si fueras un eterno principiante. El camino es tan largo que nunca se acaba y la unica manera de recorrerlo de una manera digna es disfrutar a cada paso, aprender de los errores y tener predisposición para investigar. En mi opinión, las ganas de aprender y el deseo continuo de mejorar son las características que siempre debe tener un desarrollador.",
  },
  {
    type: "title",
    text: "e B l o g",
  },
  {
    type: "footer",
    text: "Sitio web desarrollado por Eduardo Álvarez",
  },
  {
    type: "service_id",
    text: "service_x6iw3f3",
  },
  {
    type: "template_id",
    text: "template_yp6ce6c",
  },
  {
    type: "user_id",
    text: "user_BR9MTit7WqiXjJDIyEKb6",
  },
];

let articlesArray = [
  {
    title: "Comienzos en desarrollo web",
    text:
      "Puede que hayas empezado hace poco a crear tus primeros proyectos o a estudiar los aspectos más básicos de este mundo que es del desarrollo web. Mi primera recomendación es que seas constante, ya que el desarrollo web implica a diversas tecnologías y cada una tiene su propia curva de aprendizaje. Es fundamental que no te desanimes y que vaya trabajando poco a poco, sin prisa pero sin pausa. Mi segunda recomendación es que tengas paciencia. Esta se encuentra directamente relacionada con la primera ya que, debido a la complejidad que conlleva conocer los diversos aspectos que atañen al proceso de creación de un sitio web, no se puede abarcar todo y mucho menos a la vez. Al principio empezarás a estudiar cómo funcionan HTML y CSS, las cuales nos permiten construir la parte básica del cliente (front-end). Con ello, podrás hacer proyectos como un sencillo blog. Este blog sería una especie de cartel publicitario en en que el usuario no podrá interactuar con el sitio si no simplemente leerlo. El siguiente paso sería escribir pequeños programas que permitan al usuario ejecutar acciones sencillas. Lo más común es programar eventos que se ejecuten al pulsar un botón. En poco tiempo, te darás cuenta de que no todo el contenido puede estar almacenado en el cliente y te interesarás por la interacción con los servidores que nos proporcionan acceso a la información de las bases de datos. Esto te llevará a conocer AJAX, una tecnología que te permite hacer peticiones a APIs externas. En este punto se abrirá un mundo nuevo, ya que podrás tomar información de servidores como el de YouTube, Spotify, GoogleMaps... Descubrirás que existen librerías como React o frameworks como Angular o Vue que te aportarán nuevas funcionalidades y te permitirán trabajar de una manera mucho más óptima. Todo esto implica sólamente a la parte del cliente. Si entramos en la del servidor es otro mundo. Lenguajes para programar del lado del servidor, como PHP y NodeJS, entornos de trabajo como puede ser Express, y lenguajes de consultas a bases de datos como MySQL y Mongo nos permitirán crear nuestras propias APIs encargadas de almacenar y proporcionar información a nuestro front-end. Es importante que tengáis en cuenta que todas estas tecnologías no se aprenden por separado. No se trata de estudiar HTML para, una vez dominado, aprender CSS y luego Javascript, etc. Muchas de ellas se aprenden de manera paralela. Con esto quiero decir que, al principio, empezarás creando un documento HTML, le añadirás etiquetas e inmediatamente después empezarás a estilizar con CSS. Déspues de haber empezado con esto, no esperarás a dominar CSS por completo (ya que tiene más profundidad de lo que parece en un principio) para dotar de interactividad a tu página, si no que, sobre la marcha, irás aprendiendo Javascript. Todo este proceso se producirá de forma paralela ya que siempre se continúa estudiando y perfeccionando en manejo de todas las herramientas. Como puedes ver, el camino es largo, tan largo que nunca se acaba eso sí, es profundo y apasionante. Si te gusta estudiar, investigar y crear proyectos, disfrutarás con todo esto tanto como ya lo estamos haciendo muchos de nosotros. A veces es difícil e incluso frustrante pero la satisfacción de ver un proyecto terminado y de aprender algo nuevo cada día te permitirá superar con creces cualquier contratiempo.",
  },
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then((createdUsers) => {
    console.log(
      `${createdUsers.length} users have been created with the following names:`
    );
    console.log(createdUsers.map((user) => user.username));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

PersonalInfo.deleteMany()
  .then(() => {
    return PersonalInfo.create(infoArray);
  })
  .then((createdInfo) => {
    console.log(
      `${createdInfo.length} elements have been created with the following types:`
    );
    console.log(createdInfo.map((info) => info.type));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

Article.deleteMany()
  .then(() => {
    return Article.create(articlesArray);
  })
  .then((createdArticles) => {
    console.log(
      `${createdArticles.length} articles have been created with the following titles:`
    );
    console.log(createdArticles.map((article) => article.title));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
