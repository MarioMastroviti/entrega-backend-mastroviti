const express = require('express');

const router = express.Router();


const Contenedor = require("../contenedor");

const carritos = new Contenedor('carrito.json'); 


router.post('/api/cart', async (req, res) => {
    try {
              const nuevoCarrito = await carritos.guardar(req.body);
        res.json({ mensaje: 'Nuevo carrito creado', carritos: nuevoCarrito });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

router.get("/api/cart/:pid", async(req,res) => {
    const pid = parseInt(req.params.pid);
    const productoBuscado = await carritos.obtenerPorId(pid)
    
    if (!productoBuscado) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(productoBuscado);
    })

    
    router.post('/api/cart/:cid/product/:pid', async (req, res) => {
        try {
            const carritoId = parseInt(req.params.cid);
            const productoId = parseInt(req.params.pid);
    
            const carritoEncontrado = await carritos.obtenerPorId(carritoId);
            if (!carritoEncontrado) {
                return res.status(404).json({ error: 'Carrito no encontrado.' });
            }
    
            
            carritoEncontrado.productos = carritoEncontrado.productos || [];
            carritoEncontrado.productos.push(productoId);
    
            await carritos.guardarObjeto(carritoEncontrado);
    
            res.json({ mensaje: `Producto ${productoId} agregado al carrito ${carritoId}.` });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
        }
    });
    




module.exports = router;