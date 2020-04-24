const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const clientes = require('../clientes.json');
const historial = require('../historial.json');


router.get('/balance/:account', (req, res) => {    
    const {account} = req.params;
    
    var b= {} // empty Object
    var key = 'balance';
    b[key] = []; // empty Array, which you can push() values into

    if (account) {
        _.each(clientes.balance, (dato, i) => {
            if (dato.account == account) {

                b[key].push(dato);
            }
        }
        );
    }  
  res.json(JSON.stringify(b));

});

router.get('/historial', (req, res) => {
    res.json(historial);
});

router.get('/historial/all/:account', (req, res) => {
    const {account} = req.params;
    
    var all= {} // empty Object
    var key = 'transaccion';
    all[key] = []; // empty Array, which you can push() values into

    if (account) {
        _.each(historial.transaccion, (dato, i) => {
            if ((dato.fromAccount == account) || (dato.toAccount == account)) {

                all[key].push(dato);
            }
        }
        );
    }  
  res.json(JSON.stringify(all));

});

router.get('/historial/send/:account', (req, res) => {
    const {account} = req.params;
  
    var send = {} // empty Object
    var key = 'transaccion';
    send[key] = []; // empty Array, which you can push() values into

    //var send = new Array();
    if (account) {
        _.each(historial.transaccion, (dato, i) => {
            if (dato.fromAccount == account) {
               //all = all.push(dato);
              // all.fromAccount = dato.fromAccount;
              // all.toAccount = dato.toAccount;
              // all.amount = dato.amount;
              // all.sentAt =dato.sentAt;
              send[key].push(dato);
               // send = send.concat(dato);
            }
        }
        );
    }  
  //  var jsonString = JSON.stringify(all);
  var jsonFormateado = JSON.stringify(send); 
  res.json(jsonFormateado);

});

router.get('/historial/received/:account', (req, res) => {
    const {account} = req.params;
    
    //const all ={"fromAccount":"1","toAccount":"3","amount":"-350","sentAt":"2020-04-24T17:30:23.089Z"};
    var received = {} // empty Object
    var key = 'transaccion';
    received[key] = []; // empty Array, which you can push() values into

    //var  = new Array();
    if (account) {
        _.each(historial.transaccion, (dato, i) => {
            if (dato.toAccount == account) {
               //all = all.push(dato);
        
              received[key].push(dato);
              //received = received.concat(dato);
            }
        }
        );
    }  
  //  var jsonString = JSON.stringify(all);
  var jsonFormateado = JSON.stringify(received); 
  res.json(jsonFormateado);

});
router.post('/transaccion', (req, res) => {
    // Guardar Datos que nos mandan
    const { fromAccount, toAccount, amount } = req.body;
    const hoy = new Date();
    // Verifica si hay datos
    var positivo = parseInt(amount, 10);
    if ((fromAccount && toAccount && amount ) && (positivo > 0))  {
        // Verifica si las cuentas son las mismas
       if (fromAccount === toAccount) {
        res.status(510).json({error: 'Las Cuentas son Iguales Verifique'});
       }
       else {
        _.each(clientes.balance, (cliente, i) => {
            // Verifica que exista la cuenta A
            if (cliente.account === fromAccount) {
                
                const Total = cliente.balance - amount;
                console.log(Total);
                // Verifica que el saldo no sea menor a 500
               if (Total > 500) {
                   // Guarda cliente A
                    cliente.balance = parseInt(Total, 10); 
                    cliente.createdAt = hoy;
                    console.log(cliente);
                    _.each(clientes.balance, (cliente, i) => {

                        // Verifica que exista la cuenta B
                        if (cliente.account === toAccount) {  
                        
                        var enviado = parseInt(cliente.balance, 10) + parseInt(amount, 10);
                        console.log(enviado)
                            
                            // Verifica que el saldo no sea menor a 500
                        if (enviado > 500){
                           
                                // Historial
                                const sentAt = hoy;
                                const { fromAccount, toAccount, amount} = req.body;

                                const newTrasaccion = { ...req.body, sentAt};
                                historial.transaccion.push(newTrasaccion);
                             
                                
                                // Guarda datos en el cliente B 
                            
                                console.log(cliente);
                                cliente.balance = enviado;
                                cliente.createdAt = hoy;
                                res.json(cliente);
        

                        }
                        else {
                            _.each(clientes.balance, (cliente, i) => {
                                // Devuelve el dinero porque fallo la transaccion
                                if (cliente.account === fromAccount) {
                                
                                    Total = Total + amount;
                                    console.log(Total)
                                    cliente.balance = parseInt(Total, 10);
                                    res.status(510).json({error: 'El saldo Restante es menor a 500 no admiten cuentas con saldos menores'});
                                    }
                                else {
                                    res.status(510).json({error: 'El saldo Restante es menor a 500 no admiten cuentas con saldos menores'});
                                }
                                });
                            res.status(510).json({error: 'El saldo Restante es menor a 500 no admiten cuentas con saldos menores'});
                        }    
                        }
                    });
               }
               else {
                res.status(510).json({error: 'El saldo Restante es menor a 500 no admiten cuentas con saldos menores'});
               }
               

            }

       

       
        });
    }  
}         
    else {
        res.status(500).json({error: 'faltan parametros o parametros erroneos'});
    }
});

module.exports = router;