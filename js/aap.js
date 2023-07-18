const contenedorCard = document.getElementById("contenedorCards");
console.log(contenedorCard);

function mostrarProductos(itemsProductos) {
    itemsProductos.forEach(el => {
        const card = document.createElement("div");
        card.setAttribute("class", "main__item__productos")
        card.innerHTML = `<img class="producto__img img--product" src="${el.img}" alt="${el.nombre}">
        <div  class="main__detalles">
        <p class="product__description"></p>
        <p class="precio"></p>
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
    contenedorDetalle.innerHTML = ``;
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
    <button  class="button__detalles none">Cancelar</button>
    `;
    contenedorDetalle.appendChild(cardDos);

    const btnComprar = document.querySelector(".button__detalles");
    console.log(btnComprar);
    btnComprar.addEventListener("click", () => alert(`Felicidades realizaste la compra de ${productoEnContrado.nombre}`));
    const btnCancelar = document.getElementsByClassName(".none");
    btnCancelar.addEventListener("click", (e) => {
        eliminarProducto(cardDos, id);
    })
}


function eliminarProducto(carrito, idProducto) {
    const indice = carrito.findIndex(producto => producto.id === idProducto);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        console.log(`El producto con ID ${idProducto} ha sido eliminado del carrito.`);
    } else {
        console.log(`No se encontró ningún producto con ID ${idProducto} en el carrito.`);
    }
}
/* function eliminarProductos(id) {
    carrito = carrito.filter((producto) => producto.id !== id)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
} */






const carritoArray = JSON.parse(localStorage.getItem("producto")) || [];
function agregarAlCarrito(e) {
    const id = parseInt(e.target.id)
    let productoEnLista = productos.find(prod => prod.id === id);
    carritoArray.push(productoEnLista);
    console.log(carritoArray);
    storage(carritoArray);

}




mostrarProductos(productos);
///////////////////////////////////formulario
const consultaUsuario = [];
console.log(consultaUsuario);
const form = document.getElementById("formulario");
function formulario() {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const textArea = document.getElementById("comentario").value;

        const consulta = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            textArea: textArea
        };
        consultaUsuario.push(consulta);

        const validacionFormulario = consulta.nombre != "" && consulta.apellido != "" && consulta.email != "" && consulta.textArea != "";
        !validacionFormulario ? Swal.fire({
            icon: 'error',
            title: 'Algo salio mal ....!!!!',
            confirmButtonText: `Aceptar`,
            text: 'Por favor completar todos los campos',
            
            confirmButtonColor:' #3771f8',
            
        }) : Swal.fire({
            title: 'Nos contactaremos a la brevedad con usted ...!!!',
            confirmButtonText: `Aceptar`,
            confirmButtonColor:' #3771f8',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    });

}

formulario()