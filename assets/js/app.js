const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
const urlApiIndividual = "https://thesimpsonsapi.com/api/characters/";
const baseCDN = "https://cdn.thesimpsonsapi.com/500";

const containerRow = document.getElementById("rowContainer");

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

const cargarPersonajes = (listaPersonajes) => {
  listaPersonajes.forEach((personaje) => {
    let estadoPersonaje;

    if (personaje.status.toLowerCase() === "alive") {
      estadoPersonaje = `<span class="badge bg-success-subtle text-success rounded-pill px-3 py-2 fs-6"> Vivo </span>`;
    } else {
      estadoPersonaje = `<span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fs-6"> Fallecido </span>`;
    }
    const imagen = baseCDN + personaje.portrait_path;

    containerRow.innerHTML += `
       <div class="col-sm-12 col-md-6 col-lg-3 my-3 d-flex justify-content-center mb-5" data-id=${personaje.id}>
              <div class="card" style="width: 25rem"> 
              <img
                  src= ${imagen}
                  class="card-img-top p-5"
                  alt=${personaje.name}
                  style="height: 350px; object-fit: contain"
                /> 
                <div class="card-body">
                  <h5 class="card-title text-center">${personaje.name}</h5>
                  <ul>
                   <li class="card-text">Ocupación: 
                     <p>${personaje.occupation}</p>
                   </li>
                   <li class="card-text">Estado: 
                    <div>${estadoPersonaje}</div>
                   </li>
                  <ul>           
                  <a href="#" class="btn btn-primary btn-verMas text-center pl-4 mt-4"> Ver mas detalles</a>
                </div>
              </div>
            </div>
        `;
  });
};

const mostrarPersonajes = async () => {
  const personajes = await obtenerPersonaje();
  try {
    cargarPersonajes(personajes);
  } catch (error) {
    console.log(error);
  }
};

mostrarPersonajes();
