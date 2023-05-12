import { readFile, writeFile } from 'node:fs/promises'


async function getProducts(filter = {}) {
    return readFile('./data/alumnos.json')
        .then(function (data) {
            return JSON.parse(data)
        })
        .then(function (alumnos) {
            if (filter?.deleted) {
                const filterProduct = []
                for (let i = 0; i < alumnos.length; i++) {
                    if (!alumnos[i].deleted) {
                        filterProduct.push(alumnos[i])
                    }
                }
                return filterProduct
            }

            return alumnos
        })
        .catch(function (err) {
            return []
        })
}

async function saveProducts(alumnos) {
    return writeFile('./data/alumnos.json', JSON.stringify(alumnos))
}

async function getProductById(id) {
    return getProducts()
        .then(function (alumnos) {
            let product = null

            for (let i = 0; i < alumnos.length; i++) {
                if (alumnos[i].id == id) {
                    product = alumnos[i]
                    break
                }
            }

            return product
        })
}

async function createProduct(product) {
    const alumnos = await getProducts()

    let newProduct = {
        ...product,
        id: alumnos.length + 1
    }

    alumnos.push(newProduct)

    await saveProducts(alumnos)

    return newProduct
}

async function editProduct(id, product) {
    let isFound = false

    const alumnos = await getProducts()
    const editedProduct = {
        ...product,
        id: id
    }

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].id === id) {
            alumnos[i] = editedProduct
            isFound = true
        }
    }

    if (isFound) {
        await saveProducts(alumnos)
        return editedProduct
    }
    else {
        return null
    }
}

async function deleteProduct(id) {
    const alumnos = await getProducts()
    let deleteProduct = null

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].id === id) {
            alumnos[i].deleted = true
            deleteProduct = alumnos[i]
        }
    }

    await saveProducts(alumnos)

    return deleteProduct
}


export {
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct
}