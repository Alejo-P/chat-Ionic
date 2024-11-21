<h1>chat-Ionic</h1>

<h2>Integrantes</h2>
<ol>
  <li>Daniel Cola</li>
  <li>Marcelo Pinzón</li>
  <li>Silvia Chaluisa</li>
</ol>

<ul>
  <li>
    <h2>Descripcion</h2>
      <p>La aplicación consiste en una aplicacion de mensajeria,
      donde un usuario puede autenticarse y empezar un chat con
      otros usuarios autenticados, usa de backend a <em>Firebase</em>.</p>
  </li>
  <li>
    <h2>Proceso</h2>
    <p>Para la realización de la aplicación se utilizó el framework
    Ionic, el cual es un framework de código abierto que permite
    desarrollar aplicaciones móviles híbridas con tecnologías web
    como HTML, CSS y JavaScript. Además, se utilizó Firebase
    como backend.</p>
    <h2>Comandos utilizados</h2>
    <p>Para la realización de la aplicación se utilizó los
    siguientes comandos:</p>
    <p>
      Se crea un proyecto de ionic con el nombre de
      <em> Autentication-App </em>
      y se selecciona el tipo de proyecto como angular.
    </p>
    <pre><code>ionic start Autentication-App blank --type=angular --capacitor
cd Autentication-App</code></pre>
    <p>
      Se instala los modulos necesarios para el proyecto y se agrega
      firebase.
    </p>
    <pre><code>ng add @angular/fire</code></pre>
    <p>
      Se generan los servicios necesarios para la
      autenticacion y las paginas que se requeriran
      en el proyecto.
    </p>
    <pre><code>onic g page pages/login
ionic g page pages/chat
ionic g service services/chat</code></pre>
  <p>
    una vez culminado se configuran los servicios
    y las paginas para las vistas.
  </p>
  </li>
  <li>
    <h2>Capturas del funcionamiento</h2>
    <div align="center">
      <img src="https://github.com/user-attachments/assets/ec90074f-28ba-444a-be04-8eaf9daa509c" alt="Vista lista" width="450"/>
      <p>
        En esta pantalla se muestra el chat una vez el usuario
        se autentique en el servidor.
      </p>
    </div>
    <div align="center">
      <img src="https://github.com/user-attachments/assets/7d885dce-158b-4e59-8350-604aa6d4d83d" alt="Vista lista" width="450"/>
      <p>
        En esta pantalla se muestra el chat una vez el usuario
        se autentique en el servidor.
      </p>
    </div>
    <div align="center">
      <img src="https://github.com/user-attachments/assets/196d0c5c-5359-4738-8945-9cea4bb744e3" alt="Vista detalle" width="450"/>
      <p>
        Y permite el envio de ubicaciones, que comparten mediante
        texto la ubicacion actual del usuario.
      </p>
    </div>
  </li>
</ul>
