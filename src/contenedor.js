const fs = require('fs');

 class Contenedor{
    constructor(file){
        this.file = file
    }

    async guardar(objeto){
        try{
            const objetos = await this.obtenerTodosObjetos()
            const ultimoId = objetos.length > 0 ? objetos[objetos.length -1].id : 0
            const nuevoId = ultimoId +1
            const nuevoObjeto= {
                id: nuevoId, ...objeto
            }
            objetos.push(nuevoObjeto)
            await this.guardarObjeto(objetos)
            return nuevoId
        }
        catch(error){
            throw new Error("error al guardar el objeto")

        }
    }

async obtenerPorId(id){
    try{
        const objetos = await this.obtenerTodosObjetos()
        const objeto = objetos.find((o) => o.id === id)
        return objeto || null
    }
    catch(error){
        throw new Error("error al obtener el id")

        }
    }
    


async obtenerTodo(){
    try{
        const objetos = await this.obtenerTodosObjetos()
        return objetos
    }
    catch(error){
        throw new Error("error al obtener productos")
    }
}
async eliminarObjeto(id){
    try{
        let objetos = await this.obtenerTodosObjetos()
        objetos = objetos.filter((o) => o.id !== id)
        await this.guardarObjeto(objetos)
            }

catch(error){
    throw new Error("error al eliminar el objeto")
}
}
async eliminarObjetos(){
    try{
        await this.guardarObjeto([])
    }
    catch (error) {
        throw new Error("error al eliminar los objetos")
    }
}
async obtenerTodosObjetos(){
    try{
        const data = await fs.promises.readFile(this.file, "utf-8")
        return data ? JSON.parse(data) : []
    }
    catch(error){
      return  []
    }
}

async guardarObjeto(objetos){
    try{
        await fs.promises.writeFile(this.file, JSON.stringify(objetos, null, 2));
    }
    catch(error){
        throw new Error("error al guardar los objetos")
    }
}
}
/*
const main = async() => {
    
    const productos = new Contenedor()

    const id = await productos.guardar({
        titulo: "producto 3 ",descripcion: "descripcion del producto",stock: 100,categoria: "productoscat", precio: 2500, 
        
    } )

    const todosObjetos = await productos.obtenerTodo()
     }

    main().catch((error) =>console.error(error))*/
    


module.exports = Contenedor;