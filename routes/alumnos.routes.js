import express from 'express'

import * as controller from '../controllers/alumnos.controllers.js'

const route = express.Router()

route.get('/alumnos', controller.getProducts)

route.get('/alumnos/nuevo', controller.formCreateProduct)
route.post('/alumnos/nuevo', controller.createProduct)

route.get('/alumnos/:idProduct/edit', controller.formEditProduct)
route.post('/alumnos/:idProduct/edit', controller.editProduct)

route.get('/alumnos/:idProduct/delete', controller.formDeleteProduct)
route.post('/alumnos/:idProduct/delete', controller.deleteProduct)

route.get('/alumnos/:idProduct', controller.getProductById)


export default route