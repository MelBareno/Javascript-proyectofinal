// Array de productos

//---------------- Carga de productos usuarios internos ---------------------//


const listaProductos = [
  { id:1 ,nombre: "Pack  x 5- clases de yogas", categoria:"Yoga", precio: 1500, imagen: './assets/img/purchase_order/yoga-group-classes.jpg'}, 
  { id:2 ,nombre: "Clase de yoga individual", categoria:"Yoga", precio: 300, imagen: './assets/img/purchase_order/individual_yoga.jpg'},
  { id:3 ,nombre: "7 Meditaciones dinamicas con Gus",categoria:"Meditacion", precio: 4000, imagen: './assets/img/purchase_order/meditation.jpg'},
  { id:4 ,nombre: "Reescribir la mente", categoria:"Biocodificacion", precio: 2000, imagen: './assets/img/purchase_order/biodescodificacion.jpg'},
  { id:5 ,nombre: "Alineacion de Chackras - 12 dias", categoria:"Meditacion", precio: 3500, imagen: './assets/img/purchase_order/chakra_alineacion.jpg'},
];

const guardarProducto = () => {
  let nombre = document.getElementById("nombre").value;
  let categoria = document.getElementById("categoria").value;
  let precio = parseFloat(document.getElementById("precio").value);
  let imagen = document.getElementById("imagen");
  let nuevoProd = new Producto(id,nombre, categoria, precio, imagen);
  listaProductos.push(nuevoProd);
}

  // Se captura el template de los productos
  const templateProd = document.getElementById('template-prod').content
  const contenedorProd = document.querySelector('.contenedor-productos')
  const fragment = document.createDocumentFragment()
  
  
  // TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
  Object.values(listaProductos).forEach( producto => {
    templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
    templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
    templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.categoria
    templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
    templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.imagen)
    const clone = templateProd.cloneNode(true)
    fragment.appendChild(clone)
  })
  contenedorProd.appendChild(fragment)
  
  // TODO LO RELACIONADO AL CARRITO DE COMPRA

  //---------------- Carrito de compras input ---------------------//

  
  let carrito = {}

  const templateTabla = document.getElementById('agregar-producto-al-carro').content
  const tbodyCarrito = document.getElementById('carrito-body')
  const fragmentTabla = document.createDocumentFragment()
  const templateFoot = document.getElementById('tfooter').content
  const tfootCarrito = document.getElementById('footer')
  const btnCarrito = document.querySelector("#cart");
  const ventanaCarrito = document.querySelector(".cart-modal-overlay");
  const cerrarCarrito = document.querySelector("#close-btn");

  const totalCarrito = document.querySelector('.total-price');

  
  
  // abrir el carrito 
btnCarrito.addEventListener("click", ()=> {
  ventanaCarrito.classList.add("open");
})

//cerrar carrito
cerrarCarrito.addEventListener("click", ()=> {
  ventanaCarrito.classList.remove("open");
})

 contenedorProd.addEventListener('click', e => {
    
    if(e.target.textContent === "Agregar") {
      setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
  })
  const setCarrito = e => {
    const pivoteCarrito = {
      nombre: e.querySelector('.div-info .nombre-prod').textContent,
      precio: e.querySelector('.div-precio-boton .precio').textContent,
      cantidad: 1
    }
    if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
      carrito[pivoteCarrito.nombre].cantidad += 1
    } else {
      carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
    }
    pintarTabla(carrito)
  }
  
  const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach( objeto => {
      const cloneTabla = templateTabla.cloneNode(true)
      cloneTabla.getElementById('producto').textContent = objeto.nombre
      cloneTabla.getElementById('cant').textContent = objeto.cantidad
      cloneTabla.getElementById('precio-uni').textContent = objeto.precio
      let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
      cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
      fragmentTabla.appendChild(cloneTabla)
    })
    tbodyCarrito.innerHTML = ''
    tbodyCarrito.appendChild(fragmentTabla)
    pintarFooter()
  }
  const pintarFooter = () => {
    tfootCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
      tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
    } else {
      const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
      templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
      const cloneFoot = templateFoot.cloneNode(true)
      fragment.appendChild(cloneFoot)
      tfootCarrito.appendChild(fragment)
      //Boton Vaciar carrito
      const botonVaciar = document.getElementById('vaciar-tabla')
  botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarTabla(carrito)
        pintarFooter()
      })
      
      //Botones aumentar y disminuir cantidades
      
    }
  }
  tbodyCarrito.addEventListener('click', e => {
    
    if(e.target.classList.contains('button')) {
      aumentarDisminuir(e.target)
    }
  })
  const aumentarDisminuir = boton => {
    if(boton.textContent === '+'){
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++  
        }
      })
    }
    if(boton.textContent === '-') {
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--
          if(carrito[elemento.nombre].cantidad === 0) {
            delete carrito[elemento.nombre]
          }
        }
      })
    }
    pintarTabla(carrito)
    pintarFooter()
  }
         
      //Total cantidades general
  function ActualizarCantidadCarrito () {
    totalProducto.textContent = carrito.length;
}

function ActualizarCantidadCarrito () {
  totalCarrito.textContent = objetoCarrito.precioTotal;
}
