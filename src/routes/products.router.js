const express = require('express');

const router = express.Router();

const Contenedor = require("../contenedor");


const productos = new Contenedor("productos.json");


router.get("/api/products" , async(req, res) => {
    const todosProductos = await productos.obtenerTodosObjetos()
    res.json({status: "sucess", todosProductos})
   })

   router.get("/api/products/:pid", async(req,res) => {
    const pid = parseInt(req.params.pid);
    const productoBuscado = await productos.obtenerPorId(pid)
    
    if (!productoBuscado) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(productoBuscado);
    })


router.post("/api/products" , (req, res) => {
   const newProduct = new Contenedor()
    productos.guardar(newProduct);
    res.json({mensaje: "Producto agregado correctamente"})
    
})


router.put('/api/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;


    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    try {
        const productoBuscado = await productos.obtenerPorId(pid);

        if (!productoBuscado) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        const updatedProduct = await productos.actualizarObjeto(pid, updateFields);

        return res.json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
});

router.delete('/api/products/:pid', async(req, res) => {
  
    const pid = parseInt(req.params.pid);
    const productoBorrado = await productos.eliminarObjeto(pid)
    
    if (!productoBorrado) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(productos);
});
  
    



module.exports = router;