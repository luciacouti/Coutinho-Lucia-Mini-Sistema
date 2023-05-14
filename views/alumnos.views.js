function generatePage(title, contenido) {

    let html = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/styles.css"> `

    html += '<title>' + title + '</title></head><body>'

    html += '<h1>Mi espectacular pagina web</h1>'

    html += '<nav><a href="/">Home</a> | <a href="/alumnos">Productos</a> | <a href="/alumnos/nuevo">Nuevo Producto</a></nav>'

    html += contenido;

    html += '</body></html>'

    return html;
}

function generateListProducts(alumnos) {
    let html = '<ul>';
    for (let product of alumnos) {
        html += `<li>${product.name} <a href="/alumnos/${product.id}">Ver</a> <a href="/alumnos/${product.id}/edit">Modificar</a> <a href="/alumnos/${product.id}/delete">Eliminar</a></li>`
    }
    html += '</ul>'

    return generatePage('Lista de Productos', html)
}

function generateProductDetail(product) {
    let html = `<h1>${product.name}</h1>`
    html += `<p>${product.description}</p>`
    html += `<p>Precio: $${product.price}</p>`

    return generatePage('Detalle de Producto', html)
}

function generateNewProductForm() {
    let html = `<form action="/alumnos/nuevo" method="post">
        <label for="name">Nombre: 
            <input type="text" name="name" id="name">
        </label>
        <label for="description">Descripcion:
            <input type="text" name="description" id="description">
        </label>
        <label for="price">Precio
            <input type="number" name="price" id="price">
        </label>
        <button type="submit">Crear</button>
    </form>`

    return generatePage('Crear Producto', html)
}

function generateEditProductForm(product) {
    let html = `
    <h1>Modificar Producto #${product.id}</h1>

    <form action="/alumnos/${product.id}/edit" method="post">
        <label for="name">Nombre: 
            <input type="text" name="name" id="name" value="${product.name}">
        </label>
        <label for="description">Descripcion:
            <input type="text" name="description" id="description" value="${product.description}">
        </label>
        <label for="price">Precio
            <input type="number" name="price" id="price" value="${product.price}">
        </label>
        <button type="submit">Modificar</button>
    </form>`

    return generatePage(`Modificar Producto #${product.id}`, html)
}

function generateDeleteProduct(product) {
    let html = `<h1>${product.name}</h1>`
    html += `<p>${product.description}</p>`
    html += `<p>Precio: $${product.price}</p>`

    html += `<form action="/alumnos/${product.id}/delete" method="post">
        <button type="submit">Eliminar</button>
    </form>`

    return generatePage('Eliminar Producto', html)
}


export {
    generatePage,
    generateListProducts,
    generateProductDetail,
    generateNewProductForm,
    generateEditProductForm,
    generateDeleteProduct
}

/*
export default {
    generatePage,
    function2
}
*/