import * as view from '../views/alumnos.views.js'
import * as service from '../services/alumnos.services.js'

function getProducts(req, res) {
    service.getProducts({ deleted: true })
        .then(function (alumnos) {
            res.send(view.generateListProducts(alumnos))
        })
}

function getProductById(req, res) {
    let id = req.params.idProduct

    service.getProductById(id)
        .then(function (product) {

            if (product) {

                res.send(view.generateProductDetail(product))
            }
            else {
                res.send(view.generatePage('Detalle de Producto', `<h1>Producto no encontrado</h1>`))
            }
        })
}

function formCreateProduct(req, res) {
    res.send(view.generateNewProductForm())
}

function createProduct(req, res) {
    let product = {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price)
    }

    service.createProduct(product)
        .then(function (product) {
            res.send(view.generatePage('Producto Creado', `<h1>Producto creado con exito</h1>`))
        })
        .catch(function (err) {
            res.send(view.generatePage('Error al crear producto', `<h1>${err}</h1>`))
        })

}


function formEditProduct(req, res) {
    let id = req.params.idProduct

    service.getProductById(id)
        .then(function (product) {
            if (product) {
                res.send(view.generateEditProductForm(product))
            }
            else {
                res.send(view.generatePage('Modificar Producto', `<h1>Producto no encontrado</h1>`))
            }
        })
}

function editProduct(req, res) {
    let id = parseInt(req.params.idProduct)

    let product = {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price)
    }

    service.editProduct(id, product)
        .then(function (product) {
            if (product) {
                res.send(view.generatePage('Producto Modificado', `<h1>Producto modificado con exito</h1>`))
            }
            else {
                res.send(view.generatePage('Producto Modificado', `<h1>Producto no encontrado</h1>`))
            }
        })
        .catch(function (err) {
            res.send(view.generatePage('Error al modificar producto', `<h1>${err}</h1>`))
        })
}

function formDeleteProduct(req, res) {
    let id = req.params.idProduct

    service.getProductById(id)
        .then(function (product) {
            if (product) {
                res.send(view.generateDeleteProduct(product))
            }
            else {
                res.send(view.generatePage('Detalle de Producto', `<h1>Producto no encontrado</h1>`))
            }
        })
}


function deleteProduct(req, res) {
    let id = parseInt(req.params.idProduct)

    service.deleteProduct(id)
        .then(function (product) {
            if (product) {
                res.send(view.generatePage('Producto Eliminado', `<h1>Producto eliminado con exito</h1>`))
            }
            else {
                res.send(view.generatePage('Detalle de Producto', `<h1>Producto no encontrado</h1>`))
            }
        })
        .catch(function (err) {
            res.send(view.generatePage('Error al eliminar producto', `<h1>${err}</h1>`))
        })
}

export {
    getProducts,
    getProductById,
    formCreateProduct,
    createProduct,
    formEditProduct,
    editProduct,
    formDeleteProduct,
    deleteProduct
}