# SantaFe
Ejemplos y practicas con Node.Js
 

 Se tiene que correr el servidor para ello se ejecuta la siguiente linea.

 npm run dev

 En cuando el sevidor este en espera se podra acceder a las diferentes rutas.
 
 Usando la herramienta postman se pondra colocara la siguiente ruta 
 METHODO POST

http://localhost:3000/api/clientes/transaccion

En el cuerpo del methodo POST

{
   "fromAccount": "2",
   "toAccount": "1",
   "amount": "100"
}

Se vaida que el numero sea positivo
Que las cuentas no sean iguales
se resta la cantidad en la cuenta que envia y se amenta en la cuenta destino.
se valida que tenga 500 antes de enviar.


HISTORIAl
METODOS GET

 http://localhost:3000/api/clientes/historial/received/2
 http://localhost:3000/api/clientes/historial/send/2
 http://localhost:3000/api/clientes/historial/all/2

Se separaro cada methodo en seguida ponen el numero del cliente y traera los datos segun el methodo.

se saca el balance de la cuenta.

METODOS GET

 http://localhost:3000/api/clientes/balance/2 // numero de cliente

************************************************