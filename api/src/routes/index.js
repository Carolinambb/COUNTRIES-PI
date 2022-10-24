const { Router } = require('express');
// Importar todos los routers;

const Sequelize = require('sequelize')

const axios = require('axios');


const { Country, Activity} = require('../db.js');

const router = Router();

// Configurar los routers


// Busco la data de la API


const countriesApi = async () => {
    const countriesUrl = await axios.get('https://restcountries.com/v3/all');
    const countries = await countriesUrl.data.map(country => {
        return{
            name: country.name.common,
            id: country.cca3,
            flags: country.flags[0],
            continent: country.continents[0],
            capital: country.capital != null ? country.capital : 'No se encontro capital',
            subregion: country.subregion != null ? country.subregion : 'No se encontro subregion',
            area: country.area,
            population: country.population
        }
    });
    return countries;
}


// Chequeo si esta completa la DB y sino la comleto:
const dbComplete = async () => {
    //consulta a la DB
    // console.log('Inicia consulta a DB')
    let countries = await Country.findAll();

  //si la DB esta vacia cargo los datos
    if (countries.length === 0) {
        // solicitud a restcountries
        const arrCountries = await countriesApi();
        // console.log(' en /countries InfoCountries ejemplo 1: ', arrCountries[0])

        //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
        // console.log(' Inicia carga de DB con bulkCreate')
        await Country.bulkCreate(arrCountries); 
        // console.log('Fin carga de DB con bulkCreate')
        //Sequelize proporciona el método Model.bulkCreate para permitir la creación de varios registros a la vez, con una sola consulta
    }
};


router.get('/countries', async (req, res) => {
    const { name } = req.query;
    try {
        await dbComplete();
        // si viene un "name" por query
        if (name) {
            // console.log('Respuesta query con name');
            let result = await Country.findAll(
                {
                    where: {
                        name: {
                            [Sequelize.Op.iLike]: `%${name}%`, //los % son para realizar una consulta parcial.
                            //ver https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
                        } //es un metodo para realizar una consulta de búsqueda que no distinga entre mayúsculas y minúsculas.
                    }
                }
            );
            if (!result.length) {
                return res.status(400).send("No se encuentran paises para la busqueda")
            }
            return res.status(200).json(result)
        }

        //  actualizo el array con la consulta a la DB ya completa
        // console.log('Inicia consulta a DB completa')
        countryName = await Country.findAll({
            include: {
                model: Activity
            }
        });
        // console.log('Fin consulta a DB completa')
        res.status(200).send(countryName)

    } catch (error) {
        console.log(error);
    }
})





/////////////////////////////////////////////
router.get('/countries/:id', async (req,res) => {
    // Obtener el detalle de un país en particular
    // Debe traer solo los datos pedidos en la ruta de detalle de país
    // Incluir los datos de las actividades turísticas correspondientes

    const countryId = req.params.id

    let countryById = await Country.findByPk(countryId, {  //El método findByPk obtiene solo una entrada de la tabla, utilizando la clave principal proporcionada.
        include : {
            model : Activity
        }
    })

    res.status(200).send(countryById)
})




router.get('/activity', async (req,res) => {
    try {
        let activities = await Activity.findAll()
        res.status(200).send(activities)
    } catch (errors) {
        res.status(500).send('Error')
    }
})




router.post('/activity', async (req,res) => {
    try{
        let {name, difficulty, duration, season, countries} = req.body
        // Se crea la actividad
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            
        })

        // Reviso el array de paises para ver en cual se debe crear la actividad 
        countries.forEach(async (country) => {
            let activityCountry = await Country.findOne({ // obtiene la primera entrada que encuentra (que cumple con las opciones de consulta opcionales, si se proporcionan).
                where: {
                    name: country
                }
            }) 
            await newActivity.addCountry(activityCountry)
        });
        res.status(200).send('La actividad se creo exitosamente')
    } catch(error) {
        
        res.status(500).send('No se pudo crear la actividad')
    }
})


router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
        if (id) {
            await Activity.destroy({
                where: { id: id },
            });
            res.send({ msg: "Actividad eliminada" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.put("/:id", async (req, res) =>{
    const id = req.params.id
    const activity = req.body

    try{
        let act = await Activity.update(activity, {
            where: {
                id : id
            }
        });
        return res.send({ msg: "Actividad modificada" });

    } catch(error){
        console.log(error)
    }
})



//A MI DB
/*const infoDB = async () => {
    try {
        return await Country.findAll({
            include: [{
                model: Activity,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
    } catch (e) {
        console.error(e)
    }
}

//UNO MIS DOS SOLICITUDES
const infoTotal = async () => {

    const apiData = await countriesApi();
    const dbData = await infoDB();

    const infoCompleta = dbData.concat(apiData)
    return infoCompleta
}



router.get('/countries', async(req, res)=>{
    const {name} = req.query

const total = await infoTotal ()
if(name){
    let countryName = await total.filter(e=> e.name.toLowerCase().includes(name.toLocaleLowerCase()))
    countryName.length ? res.status(200).send(countryName) : res.status(404).send('country not found')
} else{
    res.status(200).send(total)
}
})*/



module.exports = router;
