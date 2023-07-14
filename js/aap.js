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
const carritoArrayDos = JSON.parse(localStorage.getItem("producto")) || [];
console.log(carritoArrayDos);
function detalleProducto() {
    carritoArrayDos.forEach(prod => {
        const cardDos = document.createElement("div");
        contenedorCardDos.innerHTML = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            ${prod.nombre} 
            $${prod.precio}
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Cancelar</button>
            </div>
        </div>
        </div>
    </div>`;
        contenedorCardDos.appendChild(cardDos);
    });
}


function itemsModal (){
    let itemDelModal = id.find(prod=>prod.id ===parseInt(id));
    carritoArrayDos.push(itemDelModal);
    console.log(carritoArrayDos);
}





const carritoArray = JSON.parse(localStorage.getItem("producto")) || [];
function agregarAlCarrito(id) {
    let productoEnLista = productos.find(prod => prod.id === parseInt(id));
    carritoArray.push(productoEnLista);
    console.log(carritoArray);
    storage(carritoArray);

}

function storage(items) {
    localStorage.setItem("producto", JSON.stringify(items));
    const productoSeleccionado = carritoArray.reduce((acc, el) => acc += `${el.nombre} -$ ${el.precio}\n`, "");
    //alert(productoSeleccionado);

}


mostrarProductos(productos);
detalleProducto();
itemsModal();




