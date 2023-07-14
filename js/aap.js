const contenedorCard = document.getElementById("contenedorCards");
console.log(contenedorCard);

function mostrarProductos(itemsProductos) {
    itemsProductos.forEach(el => {
        const card = document.createElement("div");
        card.setAttribute("class", "main__item__productos")
        card.innerHTML = `<img class="producto__img img--product" src="${el.img}" alt="${el.nombre}">
        <div  class="main__detalles">
        <p class="product__description">${el.nombre}</p>
        <p class="precio">$${el.precio}</p>
        <button id="${el.id}" class="button__agregar">ver detalle</button>
        </div>`;
        contenedorCard.appendChild(card);
    });
    const bottonCompra = document.querySelectorAll(".button__agregar");
    bottonCompra.forEach(btn => {
        btn.addEventListener("click", mostrarDetalle);
    });
}

function mostrarDetalle(e) {
    const contenedorDetalle = document.getElementById("detalle-producto");
    contenedorDetalle.innerHTML=``;
    console.log(contenedorDetalle);
    const id = parseInt(e.target.id);
    const productoEnContrado = productos.find(p => p.id === id);
    console.log(productoEnContrado);
    const cardDos = document.createElement("div");
    cardDos.setAttribute("class", "contenedor__modal")
    cardDos.innerHTML = `
    <img src="${productoEnContrado.img}" alt="${productoEnContrado.nombre}">
    <p class="product__description">${productoEnContrado.nombre}</p>
    <p>$${productoEnContrado.precio}</p>
    <button id="${productoEnContrado.id}" class="button__detalles">Comprar</button>
    <button  class="button__detalles">Cancelar</button>
    `;
    contenedorDetalle.appendChild(cardDos);

    const btnComprar = document.querySelector(".button__detalles");
    console.log(btnComprar);
    btnComprar.addEventListener("click", ()=>alert(`Felicidades realizaste la compra de ${productoEnContrado.nombre}`));
}


const carritoArray = JSON.parse(localStorage.getItem("producto")) || [];
function agregarAlCarrito(e) {
    const id = parseInt(e.target.id)
    let productoEnLista = productos.find(prod => prod.id === id);
    carritoArray.push(productoEnLista);
    console.log(carritoArray);
    storage(carritoArray);

}




mostrarProductos(productos);

