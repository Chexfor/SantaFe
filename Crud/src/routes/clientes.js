const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const clientes = require('../clientes.json');

router.get('/', (req, res) => {
    res.json(clientes);
});

router.post('/', (req, res) => {
    // Guardar Datos que nos mandan
    const { fromAccount, toAccount, amount } = req.body;
    // Verifica si hay datos
    if (fromAccount && toAccount && amount )  {
        // Verifica si las cuentas son las mismas
       if (fromAccount === toAccount){
        res.status(510).json({error: 'Las Cuentas son Iguales Verifique'});
       }
       else {
        _.each(clientes, (cliente, i) => {
            // Verifica que exista la cuenta A
            if (cliente.account === fromAccount) {
                console.log(cliente.balance);
                console.log(amount);
                const Total = cliente.balance - amount;
               console.log(Total);
                // Verifica que el saldo no sea menor a 500
               if (Total > 500) {
                _.each(clientes, (cliente, i) => {
                     // Verifica que exista la cuenta B
                    if (cliente.account === toAccount) {
                    var enviado = parseInt(cliente.balance, 10) + parseInt(amount, 10);
                       console.log(enviado)

                        // Verifica que el saldo no sea menor a 500
                       if (enviado > 500){
                           // Guarda datos en el cliente
                        const hoy = new Date();
                        cliente.balance = enviado;
                        cliente.createdAt = hoy;
                        res.json(cliente);
                       }
                       else {
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
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:account', (req, res) => {
    const { account } = req.params;
    const { balance, owner, createdAt } = req.body;
    if (account && balance && owner && createdAt )  {
        _.each(clientes, (cliente, i) => {
            if (cliente.account === account) {
                cliente.balance = balance;
                cliente.owner = owner;
                cliente.createdAt = createdAt;
            }
        });
        res.json(clientes);
    } else {
        res.status(500).json({error: 'Error.'});
    }
});

router.delete('/:account', (req, res) => {
    const {account} = req.params;
    if (account) {
        _.each(clientes, (cliente, i) => {
            if (cliente.account == account) {
                cliente.split(i, 1);
            }
        });
        res.json(clientes);
    }
});
module.exports = router;