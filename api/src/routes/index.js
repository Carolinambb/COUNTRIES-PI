const { Router, response } = require('express');
// Importar todos los routers;
const Sequelize = require('sequelize')
const axios = require('axios');
const { Country, Activity} = require('../db.js');
const router = Router();

// Configurar los routers


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


// Chequeo la DB y sino la comleto:
const dbComplete = async () => {
    let countries = await Country.findAll();
    if (countries.length === 0) {
        const arrCountries = await countriesApi();
        await Country.bulkCreate(arrCountries); 
    }
};



router.get('/countries', async (req, res) => {
    const { name } = req.query;
    try {
        await dbComplete();
        if (name) {
            let result = await Country.findAll(
                {
                    where: {
                        name: {
                            [Sequelize.Op.iLike]: `%${name}%`,     
                        } 
                    }
                }
            );
            if (!result.length) {
                return res.status(400).send("No se encuentran paises para la busqueda")
            }
            return res.status(200).json(result)
        }
        //  actualizo el array con la consulta a la DB ya completa   
        countryName = await Country.findAll({
            include: {
                model: Activity
            }
        });
        res.status(200).send(countryName)

    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/countries/:id', async (req,res) => {

    const countryId = req.params.id

    let countryById = await Country.findByPk(countryId, { 
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
        res.status(500).send(errors)
    }
})


router.post('/activity', async (req,res) => {
    try{
        let {name, difficulty, duration, season, countries, description} = req.body
        if(!name || !difficulty || !duration ||!season || !countries || !description)res.status(400).json({msg: "faltan datos"})
        // Se crea la actividad
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            description,
            
        })

        // Reviso el array de paises para ver en cual se debe crear la actividad 
        Array.from(countries).forEach(async (country) => {
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
        res.status(500).send(error);
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
        res.status(500).send(error)
    }
})

module.exports = router;
