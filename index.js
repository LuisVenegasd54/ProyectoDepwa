const webApiFirst = "https://rickandmortyapi.com/api/character";
const content = document.getElementById("container");
let webApiContentNext = "";
var responceWebApi;

async function getAllCcontent() {
    try {
        const responce = await fetch((webApiContentNext == "" ? webApiFirst : webApiContentNext));
        if (responce.status == 200) {
            return await responce.json();
        } else {
            return { error: "GET FAILED", status: 500, mesaage: "ocurrio un problema con el servidor" }
        }
    } catch (error) {
        console.log(error)
        return { error: "GET FAILED", status: 500, mesaage: error }
    }
}

function createCard(elementCard) {
    console.log(elementCard)
    webApiContentNext = elementCard.info.next
    console.log(webApiContentNext)

    elementCard.results.forEach(element => {
        let comment_content = document.createElement('div');
        comment_content.innerHTML =
            ` <div class="card m-2" style="width: 18rem; id="cards">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Personaje: ${element.name}</h5>
                    <p class="card-text"></p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre:${element.name}</li>
                    <li class="list-group-item">Genero:${element.gender}</li>
                    <li class="list-group-item">Status:${element.status}</li>
                    <li class="list-group-item">Especie:${element.species}</li>
                    <li class="list-group-item">Fecha:${element.created}</li>
                </ul>

            </div>`
        content.appendChild(comment_content);
    });
}

async function getAllElments() {
    if (!((getAllCcontent()).status == 500)) {
        // responceWebApi = await getAllCcontent();
        createCard((await getAllCcontent()))
    }
}


function esElFinal() {
    let element = document.getElementById("container");

    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
        getAllElments();
    }
}
document.addEventListener("DOMContentLoaded", async() => {
    getAllElments();
});


async function registerServiceswoeker() {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("./sw.js")
        } catch (e) {
            console.log("error en el service worker")
        }
    }
}


window.addEventListener('load', () => {
    console.log("se llamo")
    registerServiceswoeker();
});