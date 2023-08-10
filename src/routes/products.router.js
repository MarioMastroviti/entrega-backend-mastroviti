const express = require('express');

const router = express.Router();

const Contenedor = require("../contenedor");


const productos = new Contenedor("products.json")

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


router.post("/api/products" , async (req, res) => {
    try {
        const newProduct = req.body;
        await productos.guardar(newProduct);
  res.json({ mensaje: 'Nuevo producto creado'});
} catch (error) {
  res.status(500).json({ error: 'Error al crear el carrito' });
}
});
    


    /*const pid = parseInt(req.params.id);
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
    }*/

    router.put('/api/products/:pid', async (req, res) => {
        const pid = parseInt(req.params.pid);
        const cambiarObjeto = req.body;
    
        if (productos[pid]) { 
            productos[pid] = cambiarObjeto; 
            await guardar(productos); 

    res.status(200).json({ mensaje: "producto cambiado correctamente" }); 
        } else {
            res.status(400).json({ mensaje: "producto no encontrado" });
        }
    });
   
    
    
    
    
    

router.delete('/api/products/:pid', async(req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        productos.eliminarObjeto(pid);
        
     res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } 
    catch (error) {
         res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


  
    



module.exports = router;