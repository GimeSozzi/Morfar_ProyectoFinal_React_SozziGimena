# Proyecto Final - Curso React - E-commerce Morf.ar

## Descripción

**Morf.ar** es un e-commerce especializado en comida, desarrollado como parte del proyecto final del curso de React. La aplicación permite a los usuarios explorar un catálogo de productos organizados por categorías, seleccionar opciones personalizables, agregar productos al carrito y finalizar compras. Está construida utilizando React, Vite y Firebase para la gestión de datos.

## Funcionalidades

**Navegación**

- Barra de navegación con acceso a categorías (Comidas, Postres, Bebidas, Cafetería) y al carrito de compras.
- Ícono del carrito muestra dinámicamente la cantidad total de productos añadidos.
- Gestión de Productos
- Visualización de productos por categorías o como lista general.
- Vista detallada de cada producto con información como precio, descripción y stock disponible.
- Selección de cantidad de productos para agregar al carrito.

**Personalización**

- Opciones personalizables según categoría:
- Comidas y Postres: Común o Sin TACC.
- Gaseosas: Común o Sin Azúcar.
- Café con Leche: Común o Vegano.

**Carrito de Compras**

- Agregar, editar y eliminar productos del carrito.
- Total dinámico que refleja la suma de los productos seleccionados.
- Persistencia del carrito utilizando Local Storage, lo que permite conservar los productos incluso al recargar la página.

**Proceso de Compra**

- Formulario de checkout para recolectar información del comprador.
- Validación de campos y confirmación de email.
- Stock validado en tiempo real.
- Finalización de la compra con generación de una orden en Firebase.
- Mensaje visual de compra exitosa con ID de orden.
- Deshabilitación del botón "Realizar compra" mientras se procesa la orden para evitar duplicados.

**Otras Funcionalidades**

Footer con información de contacto, derechos de autor y enlaces a redes sociales como Instagram y LinkedIn.

## Tecnologías Utilizadas

- React: Desarrollo de componentes y lógica de la app.
- React Router: Navegación y gestión de rutas.
- Firebase: Gestión de base de datos y persistencia de órdenes.
- Bootstrap y CSS personalizado: Estilización de la interfaz.
- SweetAlert2: Mensajes interactivos y notificaciones.
- React Toastify: Notificaciones rápidas.
- Local Storage: Persistencia del carrito.
- Vite: Configuración y empaquetado del proyecto.

## Instalación

1. Clona el repositorio:

   `git clone https://github.com/GimeSozzi/Morfar_React_SozziGimena`

2. Navega a la carpeta del proyecto:

   `cd Morfar_React_SozziGimena`

3. Instala las dependencias:

   `npm install`

4. Inicia el servidor de desarrollo:

   `npm run dev`

## Uso

1. Inicio de la aplicación: Abre http://localhost:5173 en tu navegador para acceder a la aplicación.
2. Explora el catálogo: Navega entre categorías y agrega productos al carrito.
3. Personaliza tus productos: Selecciona opciones específicas según el tipo de producto.
4. Finaliza tu compra: Completa el formulario de checkout y obtén un ID de orden único.

## Estructura del Proyecto

src/  
├── components/  
│ ├── Brand.jsx  
│ ├── Brand.css  
│ ├── ButtonCategory.jsx  
│ ├── ButtonCategory.css
│ ├── Cart.jsx  
│ ├── Cart.css  
│ ├── CartWidget.jsx  
│ ├── CartWidget.css
│ ├── Checkout.jsx  
│ ├── Checkout.css
│ ├── Footer.jsx  
│ ├── Footer.css  
│ ├── Item.jsx  
│ ├── Item.css  
│ ├── ItemCount.jsx  
│ ├── ItemCount.css  
│ ├── ItemDetail.jsx  
│ ├── ItemDetail.css  
│ ├── ItemDetailContainer.jsx  
│ ├── ItemList.jsx  
│ ├── ItemList.css  
│ ├── ItemListContainer.jsx  
│ ├── ItemListContainer.css  
│ ├── NavBar.jsx  
│ ├── NavBar.css  
│
├── context/  
│ ├── CartContext.jsx  
│
├── firebase/  
│ ├── firebaseConfig.jsx  
│
├── services/  
│ ├── orderService.js  
│
│  
├── App.jsx  
├── main.jsx  
└── App.css

## Link a la Aplicación

Prueba la versión final de Morf.ar aquí:
https://morfar-proyecto-final-react-sozzi-gimena.vercel.app/

## Demo

Explora la aplicación en acción:
![Navegabilidad de Morf.ar](./morfar-gif.gif)

## Créditos

Este proyecto fue desarrollado como parte del Curso de React de CoderHouse.

Autor: Gimena Sozzi
