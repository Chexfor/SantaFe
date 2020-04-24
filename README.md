# SantaFe
Ejemplos y practicas con Node.Js
 

 Se tiene que correr el servidor para ello se ejecuta la siguiente linea.

 npm run dev

 En cuando el sevidor este en espera se podra acceder a las diferentes rutas.

 http://localhost:3000/api/clientes
 
 Usando la herramienta postman se pondra colocara la siguiente ruta

 http://localhost:3000/api/clientes/

En el cuerpo 

{
   "fromAccount": "2",
   "toAccount": "1",
   "amount": "100"
}

si le ponen numeros negativos hara la resta y validaciones correspodientes.
