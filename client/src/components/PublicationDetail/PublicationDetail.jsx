import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { MdFavoriteBorder } from 'react-icons/md'
import { addCarrito, addFavorites, getByPublication, removeFavorites } from '../../store/actions/actions'
// import Footer from '../Footer/Footer.jsx'
import style from './publicationDetail.module.css'
import RecomendedPublications from '../RecomendedPublications/RecomendedPublications'
import ProductDetail from '../ProductDetail/ProductDetail'

export default function PublicationDetail (props) {
  const publication = useSelector((state) => state.detailPublication)
  const favorites = useSelector((state) => state.favorites)
  // const carrito = useSelector((state) => state.carrito)
  const dispatch = useDispatch()
  const { id } = useParams()// props.match.params.id
  const [count, setCount] = useState(1)

  useEffect(() => {
    dispatch(getByPublication(id))
  }, [dispatch, id])

  const isInFavorites = (id) => {
    return favorites.some(f => f === id)
  }
  const addToCarrito = (id, countParam) => {
    for (let i = 0; i < countParam; i++) {
      const key = window.localStorage.length
      window.localStorage.setItem(key, id)
      dispatch(addCarrito(id))
    }
  }
  const updateCount = (param) => {
    if (param === 'rest' && count > 1) setCount(count - 1)
    if (param === 'add') setCount(count + 1)
  }
  return (
    <>

      <div className={style.publication}>
        <div className='image'>
          <img src={publication.img} alt={`${publication.name}`} />
        </div>
        <div className={style.name}>
          <h1>{publication.name}</h1>
          <span>{publication.price}</span>
          <span>{publication.count}</span>
        </div>
        {/* FAVORITES */}
        <div className={style.iconContainer}><MdFavoriteBorder
          className={isInFavorites(id) ? style.iconActive : style.icon} onClick={() => {
            isInFavorites(id) ? dispatch(removeFavorites(id)) : dispatch(addFavorites(id))
          }}
                                             />
        </div>
        {/* PEDIDO */}
        <div className={style.pedido}>
          <button onClick={() => updateCount('rest')}> - </button>{count}<button onClick={() => updateCount('add')}> + </button>
        </div>
        {/* CARRITO */}
        <div className={style.carrito}>
          <button onClick={() => { addToCarrito(id, count) }}>Agregar al Carrito</button>
        </div>
        {/* COMPRAR AHORA */}
        <div className={style.buyNow}>
          <Link to='/Carrito'>
            <button>Comprar ahora</button>
          </Link>
        </div>
      </div>
      {publication ? <RecomendedPublications type={publication.type} varietal={publication.varietal} origin={publication.origin} /> : null}
      {publication ? <ProductDetail publication={publication} /> : null}
      {/* <Footer /> */}
    </>
  )
}

// <div>
//   <h1>PUBLICATION DETAILS</h1>
// </div>
// {publication
//   ? (
//     <div>
//       <div>
//         <p>Name: {publication.name}</p>
//         <p>Count: {publication.count}</p>
//         <img src={publication.img} alt='imagen' />
//         <p>Price: {publication.price}</p>
//         <p>Count: {publication.count}</p>
//         <p>Description: {publication.description}</p>
//         <p>Type: {publication.type}</p>
//         <p>Type: {publication.varietal}</p>
//         <p>Type: {publication.origin}</p>
//       </div>
//       <div>
//         <button>Add to cart</button>
//       </div>
//       <div>
//         <button>Buy now</button>
//       </div>
//       <div>
//         <p>incluir componente Reseñas</p>
//       </div>
//       <div>
//         <p>incluir componente Preguntas</p>
//       </div>
//     </div>)
//   : (
//     <div>
//       <h1>Loading...</h1>
//     </div>)}