//SISTEMA DE RESERVAS DE TURNOS:

class Turno {
  constructor(nombreCliente, apellidoCliente, email, servicio) {
    this.nombreCliente = nombreCliente;
    this.apellidoCliente = apellidoCliente;
    this.email = email;
    this.servicio = servicio;
  }
}

const turnos = [];



if (localStorage.getItem('turnos')) {
  let turno = JSON.parse(localStorage.getItem('turnos'));
  /* reservas.push(...reserva); */
  for (let i = 0; i < turno.length; i++) {
    turnos.push(turno[i]);
  }
}



const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  agregarTurno();
});

function agregarTurno() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email= document.getElementById('email').value;
  const servicio = document.getElementById('servicio').value;
  const nuevoTurno= new Turno(nombre, apellido, email, servicio);
  turnos.push(nuevoTurno);
//Agrego al LocalStorage:
localStorage.setItem('turnos', JSON.stringify(turnos));
formulario.reset();
}

const contenedorTurnos = document.getElementById('contenedorTurnos');

const verTurnos = document.getElementById('verTurnos');

verTurnos.addEventListener('click', () => {
mostrarTurnos();
});

function mostrarTurnos() {
contenedorTurnos.innerHTML = '';
turnos.forEach((turno) => {
  const div = document.createElement('div');
  div.innerHTML = `
                    <div>
                        <p>Nombre del Cliente: ${turno.nombreCliente}</p>
                        <p>Apellido del Cliente: ${turno.apellidoCliente}</p>
                        <p>Email: ${turno.email}</p>
                        <p>Servico: ${turno.servicio}</p>
                    </div>
    
                    `;
  contenedorTurnos.appendChild(div);
});
}


