const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
const urlApiIndividual = "https://thesimpsonsapi.com/api/characters/";
const baseCDN = "https://cdn.thesimpsonsapi.com/500";

const containerRow = document.getElementById("rowContainer");
const buscador = document.getElementById("buscador");
const botonRecargar = document.getElementById("recargar");
const myModal = new bootstrap.Modal("#modal");
const titleH1 = document.querySelector("#exampleModalLabel");

let todosLosPersonajes = [];

const obtenerPersonaje = async () => {
  try {
    const response = await fetch(urlApiGeneral);
    const data = await response.json();
    console.log(data);
    return data.results.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
};

const obtenerUnPersonaje = async (idPersonaje) => {
  try {
    const response = await fetch(`${urlApiIndividual}${idPersonaje}`);
    const data = await response.json();

    return data[0];
  } catch (error) {
    console.log(error);
  }
};

const cargarPersonajes = (listaPersonajes) => {
  containerRow.innerHTML = "";
  listaPersonajes.forEach((personaje) => {
    let estadoPersonaje;

    if (personaje.status.toLowerCase() === "alive") {
      estadoPersonaje = `<span class="badge bg-success-subtle text-success rounded-pill px-3 py-2 fs-6"> Vivo </span>`;
    } else {
      estadoPersonaje = `<span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fs-6"> Fallecido </span>`;
    }

    const imagen = baseCDN + personaje.portrait_path;

    containerRow.innerHTML += `
       <div class="col-sm-12 col-md-6 col-lg-3 my-3 d-flex justify-content-center mt-5 mb-4" data-id=${personaje.id}>
              <div class="card d-flex flex-column h-100" style="width: 25rem"> 
              <img
                  src= ${imagen}
                  class="card-img-top p-5"
                  alt=${personaje.name}
                  style="height: 350px; object-fit: contain"
                /> 
                <div class="card-body">
                  <h5 class="card-title mb-3 text-center"> ${personaje.name}</h5>
                  <ul>
                   <li class="card-text mb-3">Ocupación: 
                     ${personaje.occupation}.
                   </li>
                   <li class="card-text">Estado: ${estadoPersonaje}</li>
                  <ul>           
                  <a href="#" class="btn btn-primary btn-verMas text-center pl-4 mt-5"> Ver mas detalles</a>
                </div>
              </div>
            </div>
        `;
  });
};

buscador.addEventListener("input", () => {
  const valorBusqueda = buscador.value.toLowerCase().trim();

  if (valorBusqueda.length > 0) {
    botonRecargar.classList.remove("d-none");
  } else {
    botonRecargar.classList.add("d-none");
  }

  const filtradoPersonaje = todosLosPersonajes.filter((personaje) => {
    return personaje.name.toLowerCase().includes(valorBusqueda);
  });

  if (filtradoPersonaje.length === 0) {
    containerRow.innerHTML = `<h5 class="text-center mt-5 w-100 text-muted">No se encontraron coincidencias para "${buscador.value}".</h5>`;
  } else {
    cargarPersonajes(filtradoPersonaje);
  }
});

botonRecargar.addEventListener("click", () => {
  buscador.value = " ";
  botonRecargar.classList.add("d-none");
  cargarPersonajes(todosLosPersonajes);
});

const mostrarPersonajes = async () => {
  const personajes = await obtenerPersonaje();
  try {
    todosLosPersonajes = personajes;
    cargarPersonajes(personajes);
  } catch (error) {
    console.log(error);
  }
};

const verDetalle = async (id) => {
  const personaje = await obtenerUnPersonaje(id);
  console.log(personaje[0].name);
};

containerRow.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-verMas")) {
    const idPeronsaje = e.target.results.id;
    console.log(idPeronsaje);
    const personaje = await obtenerUnPersonaje(idPersonaje);
    titleH1.textContent = personaje.name;

    myModal.show();
  }
});

mostrarPersonajes();
