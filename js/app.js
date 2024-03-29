const contenedorCard = document.getElementById("contenedorCards");
console.log(contenedorCard);
const contenedorCompra = document.getElementById("compra--section");
console.log(contenedorCompra);
const costoTotal = document.getElementById("costo--total");





const obtenerProductos = async () => {
    const res = await fetch('./js/productos.json');
    const data = await res.json();
    return data;
}
obtenerProductos().then(data => mostrarProductos(data));



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
    obtenerProductos().then(productos => {
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
        <div class= "div--container">
        <p class="titulo--description">Detalle del Producto</p>
        <p class="product__description">${productoEnContrado.nombre}</p>
        </div>
        <div><p class="product__description">$${productoEnContrado.precio}</p>
        </div>
        <div>
        <button id="${productoEnContrado.id}" class="button__detalles agregar-carrito">Agregar al carrito</button>
        </div>
        `;
        contenedorDetalle.appendChild(cardDos);
        const btnAgregarCarrito = document.querySelector(".agregar-carrito");
        console.log(btnAgregarCarrito);
        btnAgregarCarrito.addEventListener("click", agregarAlCarrito);

    });
}


const carritoArray = JSON.parse(localStorage.getItem("producto")) || [];
console.log(carritoArray);


function agregarAlCarrito(e) {
    obtenerProductos().then(productos => {
        const id = parseInt(e.target.id)
        let productoEnLista = productos.find(prod => prod.id === id);
        const productoCarrito = carritoArray.find((producto) => producto.id === id)
        if (productoCarrito) {
            productoCarrito.cantidad++
            localStorage.setItem("producto", JSON.stringify(carritoArray));
            mostrarCarrito();
        } else {
            productoEnLista.cantidad = 1;
            carritoArray.push(productoEnLista);
            console.log(carritoArray);
            localStorage.setItem("producto", JSON.stringify(carritoArray));
            mostrarCarrito();
        }
    })
}


function mostrarCarrito() {
    contenedorCompra.innerHTML = ``;
    carritoArray.forEach(prod => {
        const cardTres = document.createElement("div");
        cardTres.setAttribute("class", "contenedor__mostrar__carrito");
        cardTres.innerHTML = ` 
        <div class= "modal-productos--container">
        <p class="titulo--description">Producto</p>
        <p class="titulo--description">${prod.nombre}</p>
        <p class="titulo--description">Cantidad :${prod.cantidad}</p>
        <p class="product__description">$${prod.precio * prod.cantidad}</p>
        </div>
        <div class="btn--productos--container">
        <button id="btn-${prod.id}" class="button--productos cancelar">Eliminar</button>
        </div>`;
        contenedorCompra.appendChild(cardTres);
        const btnCancelar = document.getElementById(`btn-${prod.id}`);
        console.log(btnCancelar);
        btnCancelar.addEventListener("click", (e) => {
            eliminarProducto(carritoArray, prod.id);
        });
    });
    const btnFinalizar = document.createElement("button");
    btnFinalizar.innerHTML = ``;
    btnFinalizar.innerText = "Finalizar Compra";
    btnFinalizar.setAttribute("class", "button__detalles agregar-carrito");
    btnFinalizar.addEventListener("click", finalizarCompra);
    contenedorCompra.appendChild(btnFinalizar);
    
}

function finalizarCompra(e){
    e.preventDefault();
    const precioFinal = carritoArray.reduce( (acc, prod) => acc += prod.precio * prod.cantidad, 0);
    console.log(precioFinal);
    const totalProductoEnDOM = document.createElement("div");
    totalProductoEnDOM.innerHTML =``;
    totalProductoEnDOM.setAttribute("class", "precio--final");
    costoTotal.appendChild(totalProductoEnDOM);
    swal.fire(`El costo total es de:$${precioFinal}. Muchas gracias por su compra ....!!!`);
    contenedorCompra.innerHTML = ``;
}


mostrarCarrito();


function eliminarProducto(carrito, idProducto) {
    const indice = carrito.findIndex(producto => producto.id === idProducto);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        swal.fire(`El producto se elimino correctamente...!! `);
        localStorage.setItem("producto", JSON.stringify(carritoArray));
        mostrarCarrito();
    } else {
        swal.fire(`No se encontro ningun producto `);
        localStorage.setItem("producto", JSON.stringify(carritoArray));
        mostrarCarrito();
    }
}
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

            confirmButtonColor: ' #3771f8',

        }) : Swal.fire({
            title: 'Nos contactaremos a la brevedad con usted ...!!!',
            confirmButtonText: `Aceptar`,
            confirmButtonColor: ' #3771f8',
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







