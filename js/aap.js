const contenedorCard = document.getElementById("contenedorCards");
console.log(contenedorCard);

function mostrarProductos(itemsProductos) {
    itemsProductos.forEach(el => {
        const card = document.createElement("div");
        card.setAttribute("class", "main__item__productos")
        card.innerHTML = `<img class="producto__img img--product" src="${el.img}" alt="${el.nombre}">
        <div  class="main__detalles">
        <p class="product__description">${el.nombre}</p>
        <p class="precio">${el.precio}</p>
        <button id="${el.id}" class="button__agregar">Comprar</button>
        </div>`;
    contenedorCard.appendChild(card);
    });
    const bottonCompra = document.querySelectorAll(".button__agregar");
    bottonCompra.forEach(item =>{
        item.addEventListener("click", (e)=>{
            agregarAlCarrito(e.target.id)
        });
    });
}

mostrarProductos(productos); 
const arrayVacio = [];


function agregarAlCarrito (id){
    let productoEnLista = productos.find(prod =>prod.id === parseInt(id));
    arrayVacio.push(productoEnLista);
    console.log(arrayVacio);

}

function storage (items){
    localStorage.setItem("Producto", JSON.stringify(items));
    const traerItems = JSON.parse(localStorage.getItem("producto"));
}

storage(arrayVacio);


/* 

const cosas = [{nombre:"Galletas", precio:25},
{nombre:"dulce", precio:40}];




function storage (productos){
    localStorage.setItem("productos", JSON.stringify(productos));
    const traerItems = JSON.parse(localStorage.getItem("productos"));
    alert(traerItems);
}
storage(cosas); */
