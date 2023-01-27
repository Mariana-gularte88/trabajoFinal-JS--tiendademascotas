const callML = () => {
    return fetch('https://api.mercadolibre.com/sites/MLA/search?q=articulosparagatos');
}



let carrito = [];
let productos = [];

callML()
.then(res => res.json())
.then((res) => {
    console.log(res);
    productos = [...productos, ...res.results];
    dibujarProductos(productos, contenedor)
})
.finally(() => {
    console.log('termino de cargar')
})


class Carrito {
    constructor (id, nombre, cantidad, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen =imagen;
        this.total = precio * cantidad;
    }
}

const contenedor = document.getElementById('contenedorGato');
const inputSearch = document.getElementById('input-search-gato');
const contenedorCarrito = document.getElementById('contenedor-carrito');


const agregarAlCarrito = (id) => {
 console.log(id);
  if (!id) {
      return;
  }

 const producto = productos.find((el) => el.id === id);


  if (producto) {
  const productoCarrito = new Carrito (producto.id, producto.title, 1, producto.price, producto.thumbnail);

         if (carrito.some(el => el.id === id)) {
            const target = carrito.find(el => el.id === id);
            carrito = carrito.filter(el => el.id !== id);


    
      const nuevoProducto = new Carrito(target.id, target.nombre, target.cantidad + 1, target.precio,
            target.imagen);
     carrito.push(nuevoProducto);
    } else {
     carrito.push(productoCarrito);
 }
 }

listarCarrito()

}



const listarCarrito = () => {
    let acumulador = '';

    carrito.forEach ((producto) => 
        acumulador += `
        <tr>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.total}</td>
         </tr>

        `
)

    contenedorCarrito.innerHTML = acumulador;
}


const dibujarProductos = (productos, contenedor) => {
    let acumulador = '';
  
    productos.forEach (element => {
         acumulador += `
         <div class="card" style="width: 18rem;">

         <img src="${element.thumbnail}" class="card-img-top" alt="${element.title}"></img>
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">Cantidad: ${element.available_quantity}</p>
        <p class="card-text">Precio: $${element.price}</p>
        <button id= "${element.id}" class= "botones-compra btn btn-primary"> Comprar</button>
        </div>
     </div>
 
     `
 
 });
  
    contenedor.innerHTML = acumulador;
    const btnsCompra = document.querySelectorAll('.botones-compra');
    btnsCompra.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log('hola')
            agregarAlCarrito(e.target.id);
        })
    })

}

dibujarProductos(productos, contenedor)



const handleSearch = (e) => {
    console.log(e.target.value);

    const filtrados = productos.filter(productos => productos.title.toLocaleLowerCase().includes(e.target.value.toLowerCase()))


    dibujarProductos(filtrados, contenedor)
}

inputSearch.addEventListener('input', handleSearch)
