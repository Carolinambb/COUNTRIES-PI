import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, postActivity } from '../actions'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import styles from './CreateActivity.module.css'
import styles1 from './Button.module.css'

function validate(input) {
    let errors = {}
    if(!input.name){
        errors.name = ("Name is required") }
       else if(input.name.length > 40){
        errors.name = ("Name is to long")        
     } else if(!input.difficulty){
        errors.difficulty = ("Difficulty is required")
    }else if(!input.duration){
        errors.duration =("Duration is required") 
     }else if(input.duration  > 24 || input.duration < 1)
     errors.duration = ("The duration must be between 1hs and 24hs")
     
    else if(!input.season){
        errors.season = ("Season is required")

    }else if(input.countries.length === 0){
        errors.countries = ("At least one country is required")
    }

    return errors
}


export default function CreateActivity() {
    const dispatch = useDispatch()

    const history = useHistory() 

    const countries = useSelector((state) => state.countries)

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season:'',
        countries: [],
    })


    useEffect(() => {
        dispatch(getCountries()) //fijarse eso
    }, [dispatch])
    
    console.log(input)

    function handleChange(e){
        // Le agregamos el e.target.value (lo que vamos modificando) al input actual 

        e.preventDefault();
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(validate({
          ...input,
          [e.target.name]: [e.target.value]
        })
        )
    }


    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input, 
                [e.target.name] : e.target.value
            })
        }
         setErrors(validate({
             ...input, 
             [e.target.name] : e.target.value
         }))
    }


    function handleSelectCountry (e){
        e.preventDefault()
        setInput({
            ...input,
            // Concateno lo que ya habia en el array, con el nuevo value
            countries: [...new Set([...input.countries, e.target.value])]
        })
        setErrors(validate({
            ...input,
            countries: [...input.countries, e.target.value]
        }))
    }



    function handleSubmit(e){
        if( input.countries < 1 || !input.difficulty || !input.duration || !input.season ||!input.name ){
            e.preventDefault();
            alert('Complete all the fields to be able to continue')
        } else {
            e.preventDefault();
            dispatch(postActivity(input));
            alert('Your activity has been successfully created');
            history.push('/home')
            // Reseteamos el input
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season:'',
                countries: [],
            })
        }
         setErrors(validate({
             ...input, 
            [e.target.name] : e.target.value
         }))    
    }

    function handleDelete(e){
        setInput({
            ...input,
            //Se va a filtrar todo el array, devolviendo todos los paises que no coincidan con el seleccionado
            countries: input.countries.filter(country => country !== e)
        })
    }

    return (
        <div  className={styles.create}>
            <div>
            <Link to='/home'>
                <button className={styles1.back_form}>Go back</button>
            </Link>
            </div>
            <h1 className={styles.title}>Create activity</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.justify}>
                <div>
                <div className={styles.container}>
                    <label className={styles.label}>Name: </label>
                    <input type="text" value={input.name} name='name' onChange={handleChange} className={styles.input}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                

                <div className={styles.container}>
                    <label className={styles.label}>Difficulty: </label>
                    <label>
                    <input type="radio" value='1' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    1</label>
                    <label>
                    <input type="radio" value='2' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    2</label>
                    <label>
                    <input type="radio" value='3' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    3</label>
                    <label>
                    <input type="radio" value='4' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    4</label>
                    <label>
                    <input type="radio" value='5' name='difficulty' onChange={(e) => handleCheck(e)}/>
                    5</label>
                </div>
                <div className={styles.container}>
                    <label className={styles.label}>Duration: </label>
                    <input type="number" min="1" max="24"  value={input.duration} name='duration' onChange={handleChange} className={styles.input}/>
                    {errors.duration && (<p>{errors.duration}</p>)}
                </div>
                <div className={styles.container}>
                    <label className={styles.label}>Season: </label>
                    <label>
                    <input type="radio" value='Verano' name='season' onChange={(e) => handleCheck(e)}/>
                    Summer</label>
                    <label>
                    <input type="radio" value='Primavera' name='season' onChange={(e) => handleCheck(e)}/>
                    Spring</label>
                    <label>
                    <input type="radio" value='Otoño' name='season' onChange={(e) => handleCheck(e)}/>
                    Autumn</label>
                    <label>
                    <input type="radio" value='Invierno' name='season' onChange={(e) => handleCheck(e)}/>
                    Winter</label>
                    {errors.season && (<p>{errors.season}</p>)}
                </div>

                <div className={styles.container}>
                    <label className={styles.label}>Country: </label> 
                    <select onChange={(e) => handleSelectCountry(e)} className={styles1.select}>
                  <option value='selected' hidden >Select country</option>

                   {countries?.map((country) => (
                        <option value={country.name} key={country.id}>{country.name}</option>
                    ))}

                    </select>
                    
                    {errors.countries && (<p>{errors.countries}</p>)}
                </div>

                {input.countries.map((e) =>
                <div className={styles.countryContainer}>
                    <p className={styles.name}>{e}</p>
                    <button type='button' onClick={() => handleDelete(e)} className={styles1.back_delete}>X</button>
                </div>
                
                )}
                <div className={styles.center}>
                <button type='submit' className={styles1.btn_submit}>Create acitvity</button>
                </div>
                </div>
            </form>
        </div>
    )
}



