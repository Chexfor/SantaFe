const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const clientes = require('../clientes.json');

router.get('/', (req, res) => {
    res.json(clientes);
});

router.post('/', (req, res) => {
    const account = clientes.length + 1;
    const { balance, owner, createdAt } = req.body;
    const newCliente = { ...req.body, id };
    if (account && balance && owner && createdAt ) {
        clientes.push(newCliente);
        res.json(clientes);
    } else {
        res.status(500).json({error: 'No se puede generar '});
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