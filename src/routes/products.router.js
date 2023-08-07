const express = require('express');

const router = express.Router();

const Contenedor = require("../contenedor");


const productos = new Contenedor("productos.txt");


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




module.exports = router;