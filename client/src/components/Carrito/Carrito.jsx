import React from 'react'
import { useSelector } from 'react-redux'
import ItemCarrito from '../ItemCarrito/ItemCarrito'
import style from './carrito.module.css'
import { Link } from 'react-router-dom'

export default function Carrito () {
  const carrito = useSelector(state => state.carrito)
  const pagarMP = async () => {
    const buying = carrito.map(item => {
      return {
        title: item.title,
        description: item.description,
        unit_price: parseInt(item.price),
        quantity: parseInt(item.count),
        category_id: parseInt(item.id)
      }
    })
    fetch('http://localhost:3001/checkout', {
      method: 'POST',
      body: JSON.stringify(buying),
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        document.location = data.data
      })
  }

  const totalAmount = carrito.reduce((acumulador, pactual) => {
    const total = (parseInt(pactual.price) * parseInt(pactual.count))
    return acumulador + total
  }, 0)

  return (
    <div className={style.container}>
      {carrito.length > 0
        ? carrito.map(p => {
          return (
            <ItemCarrito key={p.id} id={p.id} title={p.title} price={p.price} count={p.count} image={p.image} name={p.name} />
          )
        })
        : <h3>No has agregado nada al carrito aún!</h3>}
      <div className={style.total}>
        <div className={style.envio}>
          Aca va la direccion de envio del usuario: y aca el costo
        </div>
        <div className={style.sumaTotal}>
          Total con envio:{carrito.length > 0
          ? totalAmount
          : 'No hay productos en el carrito'}
        </div>
      </div>
      <button onClick={pagarMP}>Pagar con MercadoPago</button>
      <Link to={`/payment/${totalAmount}`}>
        <button>Pagar con Tarjeta</button>
      </Link>
    </div>
  )
}

// const getCarritoPublications = (carrito, publications) => {
//   const pubInCarrito = []
//   carrito.forEach(c => {
//     pubInCarrito.push([publications.find(p => p.id === c.id), c.count])
//   })
//   return pubInCarrito
// }

// const publications = useSelector(state => state.allPublications)
// const [publicationsCarrito, setPublicationsCarrito] = useState()
// useEffect(() => {
//   setPublicationsCarrito(getCarritoPublications(carrito, publications))
// }, [publications, carrito])
// console.log('carrito', carrito, 'publications', publications, 'publicationsCarrito', publicationsCarrito)
