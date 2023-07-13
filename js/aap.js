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
    bottonCompra.forEach(item => {
        item.addEventListener("click", (e) => {
            agregarAlCarrito(e.target.id)
        });
    });
}
const contenedorCardDos = document.getElementById("detalle-producto");
function detalleProducto() {
    carritoArray.forEach(prod => {
        const cardDos = document.createElement("div");
        contenedorCardDos.innerHTML = `
        <div class="main__detalles">
        <p class="product__description">${prod.nombre}</p>
        <p class="precio">${prod.precio}</p>
        <button id="${prod.id}" class="button__agregar">Cancelar</button>
        </div>`;
        contenedorCardDos.appendChild(cardDos);
    })
}


function agregarAlCarrito(id) {
    let productoEnLista = productos.find(prod => prod.id === parseInt(id));
    carritoArray.push(productoEnLista);
    console.log(carritoArray);
    storage(carritoArray);

}

function storage(items) {
    localStorage.setItem("producto", JSON.stringify(items));
    const productoSeleccionado = carritoArray.reduce((acc, el) => acc += `${el.nombre} -$ ${el.precio}\n`, "");
    alert(productoSeleccionado);

}


mostrarProductos(productos);
detalleProducto()

const carritoArray = JSON.parse(localStorage.getItem("producto")) || [];



