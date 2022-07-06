const fs = require('fs');

class Container{
    constructor(nameFile){
        this.nameFile = nameFile
    }

    async createFile(){
        try{
             await fs.promises.writeFile("productos.txt", "")
             return console.log("Archivo Creado!")
        }
        catch(err){
            console.log("No se pudo crear el archivo!",err)
        }
    }        
    
    async save(title, price, thumbnail){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            let dataFile = [];
            if (res != ""){
                dataFile = JSON.parse(res)
            }

            let item = {};
            item.title = title,
            item.price = price,
            item.thumbnail = thumbnail,
            item.id = dataFile.length + 1;
            dataFile.push(item)

            await fs.promises.writeFile("productos.txt", JSON.stringify(dataFile, null, 2))
            
            return console.log(`Se guardo el Item id: ${item.id}`)
        }
        catch(err){
            console.log("No se pudo guardar!",err)
        }
    }

    async getById(id){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return console.log(`El archivo esta vacio: ${null}`);
            }
            let data = JSON.parse(res)
            let item = data.find((elem) => elem.id === id)
            if(item === undefined){
                return console.log(`No se encontro el item con id: ${id} item: ${null}`)
            }
            return console.log("El item con id: ", item.id," ", item)
        }
        catch(err){
            console.log('No se pudo encontrar el elemento!',err)
        }
    }

    async getAll(){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == " "){
                return console.log("Archivo vacio!")
            }
            const data = JSON.parse(res)
            return console.log("Los datos del Archivos: ", data);
        }  
        catch(err){
            console.log("No se pudo leer!",err)
        }
    }

    async deleteById(id){
        try{
            const res = await fs.promises.readFile("productos.txt", "utf-8")
            if(res == ""){
                return console.log(`El archivo esta vacio: ${null}`);
            }
            let data = JSON.parse(res)

            let item = data.find((elem) => elem.id === id)
            if(item === undefined) return console.log(`No se encontro el item con id: ${id} item: ${null}`)
            
            let dataFile = data.filter((elem) => elem.id !== item.id)
            await fs.promises.writeFile("productos.txt", JSON.stringify(dataFile, null, 2))
            return console.log (`Elemento eliminado con id: ${id}`)
        }
        catch(err){
            console.log('No se pudo eliminar!',err)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile("productos.txt", " ")
            return console.log("Se eliminaron los elementos del Archivo!")
        }
        catch(err){
            console.log("No se pudo borrar el archivo!",err)
        }    
    }
} 

let container1 = new Container("productos.txt");
setTimeout(() => {container1.createFile()}, 1500) 

setTimeout(() => {
    container1.save("audifonos", 55, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png")
}, 2000); 
setTimeout(()=> {container1.save('Escuadra', 123.45, "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png")}, 2500)
setTimeout(()=> {container1.save('Calculadora', 234.56, "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png")}, 3000)
setTimeout(()=> {container1.save('Globo Terráqueo', 345.67, "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png")}, 3500)

setTimeout(() => {container1.getAll()}, 4000)


setTimeout(() => {container1.getById(2)}, 4500)
setTimeout(() => {container1.getById(10)}, 5000)

setTimeout(() => {container1.deleteById(1)}, 5500)
setTimeout(() => {container1.deleteById(20)}, 6000)

setTimeout(() => {container1.getAll()}, 6500)

setTimeout(() => {container1.deleteAll()}, 8000) 

setTimeout(() => {container1.getAll()}, 10000)