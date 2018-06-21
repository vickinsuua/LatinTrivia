const express = require('express');
const router = express.Router();
const checkAuth = require('./middleware/check-auth');
const OrdersController = require('./controllers/orders');

//populate es para traer la informacion del campo foraneo con moongose

router.get('/', checkAuth, OrdersController.orders_get_all );

router.post('/', checkAuth, OrdersController.orders_post_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;
