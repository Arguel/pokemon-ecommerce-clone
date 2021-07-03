import React, {useState, useContext, useEffect} from "react"
import InputCheckbox from "../../Molecules/InputCheckbox/InputCheckbox";
import Button from './../../Atoms/Button/Button';
//import {pokemonsGrass} from './../../../json-data-grass';
//import {pokemonsLightning} from './../../../json-data-lightning';
import {categoriesContext} from './../../Contexts/GameCards/GameCards';
import {Link} from 'react-router-dom';
import Image from "../../Atoms/Image/Image";
import {getFirestore} from './../../../firebase';

require('./ItemCategories.css')

const db = getFirestore();

//API's
const grassUrl = db.collection("data-grass");
const lightningUrl = db.collection("data-lightning");


function ItemCategories({match}) {


  //LOCAL STATE
  const [form, setForm] = useState([]);

  //CONTEXT
  const [, setCategory] = useContext(categoriesContext);

  //const grassUrl = pokemonsGrass;
  //const lightningUrl = pokemonsLightning;

  //FUNCTIONS
  const addToList = value => {
    setForm([...value, ...form])
  }

  const removeFromList = value => {
    setForm(form.filter(elem => !value.includes(elem)));
  }

  const filterElements = e => {
    e.preventDefault();
    setCategory(form);
  }


  useEffect(() => {
    const category = match.url.split('/').pop();

    const getDocs = async (category) => {
      try {
        const response = await category.get();
        const responseData = response.docs.map(doc => doc.data());
        setCategory(responseData);
      }
      catch (error) {
        console.log(error);
      }
    }

    switch (category) {
      case "type-grass":
        getDocs(grassUrl)
        break;
      case "type-lightning":
        getDocs(lightningUrl)
        break;
      default:
        break;
    }
  }, [match.url, setCategory])

  return <>
    <div>
      <h1>Categorías</h1>
      <div className="d-flex gap-2">

        <div>
          <Link to="/gamecards/type-grass" className="text-decoration-none">
            <Button btnClass="btn-red text-white d-flex flex-column justify-content-center align-items-center">
              <Image imgClass="categories__img--medium" src="/icons/bullbasaur.svg" alt="Tipo planta icono" />
              <span>Tipo planta</span>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/gamecards/type-lightning" className="text-decoration-none">
            <Button btnClass="btn-red text-white d-flex flex-column justify-content-center align-items-center">
              <Image imgClass="categories__img--medium" src="/icons/pikachu-2.svg" alt="Tipo rayo icono" />
              <span>Tipo rayo</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>

    <form className="row g-3 m-auto" onSubmit={e => filterElements(e)}>
      <div className="col-12">
        <h3>Búsqueda custom (solo funciona en <Link to="/gamecards">/gamecards</Link>)</h3>
      </div>
      <div className="col-12">
      </div>
      <div className="col-12">
      </div>
      <div className="col-12 text-center">
        <Button btnClass="btn-orange text-white w-25" type="submit">
          <i className="fas fa-search"></i>
          <span className="ms-2">Buscar</span>
        </Button>
      </div>
    </form>
  </>
}

//<InputCheckbox id="typeGrass" ariaLabel="Tipo planta" onChange={e => e.target.checked ? addToList(grassUrl) : removeFromList(grassUrl)}>Tipo planta</InputCheckbox>
//<InputCheckbox id="typeLightning" ariaLabel="Tipo rayo" onChange={e => e.target.checked ? addToList(lightningUrl) : removeFromList(lightningUrl)}>Tipo rayo</InputCheckbox>
export default ItemCategories
