import axios from 'axios'

export function getPublications () {
  return async function (dispatch) {
    try {
      const api = await axios.get('http://localhost:3001/publications')
      return dispatch({
        type: 'GET_PUBLICATIONS',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getByPublication (id) {
  return async function (dispatch) {
    try {
      const api = await axios.get(`http://localhost:3001/publications/${id}`)
      return dispatch({
        type: 'GET_BY_ID_PUBLICATION',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function postPublication (data, token) {
  return async function (dispatch) {
    try {
      const api = await axios.post('http://localhost:3001/publications/', data)
      return dispatch({
        type: 'POST_PUBLICATION',
        Headers: { 'content-type': 'application/json' },
        payload: api.data
      })
    } catch (error) {
      console.log(error.response)
      throw new Error(error.response.data)
    }
  }
}

export function getProducts () {
  return async function (dispatch) {
    try {
      const api = await axios.get('http://localhost:3001/products')
      return dispatch({
        type: 'GET_PRODUCTS',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getByIdProduct (id) {
  return async function (dispatch) {
    try {
      const api = await axios.get(`http://localhost:3001/products/${id}`)
      return dispatch({
        type: 'GET_BY_ID_PRODUCT',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function postProduct (data) {
  return async function (dispatch) {
    try {
      const api = await axios.post('http://localhost:3001/products', data)
      return dispatch({
        type: 'POST_PRODUCT',
        payload: api.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// pending
export const searchByNameProduct = (name) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/products?name=${name}`)
      .then((respuesta) => respuesta.json())
      .then((infoProductName) => {
        dispatch({ type: 'SEARCH_PRODUCT_BY_NAME', payload: infoProductName })
      })
  }
}

// /publications/filter
export const filterPublications = ({ varietal, type, origin, opt }) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/publications/filter?varietal=${varietal}&type=${type}&origin=${origin}&opt=${opt}`)
      return dispatch({
        type: 'FILTER_PUBLICATIONS',
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const clearFilter = () => {
  return { type: 'CLEAR_FILTER', payload: null }
}

// Search Publication by Name

export const searchPublicationByName = (name) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/publications?name=${name}`).then((respuesta) =>
      respuesta.json().then((dataP) => {
        dispatch({ type: 'GET_PUBLICATIONS', payload: dataP })
      })
    )
  }
}

// Favorites

export const addFavorites = (id) => {
  return {
    type: 'ADD_FAVORITES',
    payload: id
  }
}

export const removeFavorites = (id) => {
  return {
    type: 'REMOVE_FAVORITES',
    payload: id
  }
}

// CARRITO

export const addCarrito = (publication) => {
  return {
    type: 'ADD_CARRITO',
    payload: publication
  }
}

export const removeCarrito = (id) => {
  return {
    type: 'REMOVE_CARRITO',
    payload: id
  }
}

// RECOMENDED PUBLICATIONS

export const getRecomendedPublications = (type, varietal, origin) => {
  return async function (dispatch) {
    try {
      console.log(type, varietal, origin)
      const recPub = await axios(`http://localhost:3001/publications/filter?type=${type || null}&varietal=${varietal || null}&origin=${origin || null}`)
      console.log(recPub)
      return dispatch({
        type: 'RECOMENDED_PUBLICATIONS',
        payload: recPub.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// STRIPE

export const postStripe = (idStripe, totalAmount, carrito, userId) => {
  return async function (dispatch) {
    try {
      const res = await axios.post('http://localhost:3001/stripe', {
        idStripe,
        totalAmount,
        carrito,
        userId
      })
      console.log(res)
      return dispatch({
        type: 'POST_STRIPE',
        payload: res.data
      })
    } catch (error) {

    }
  }
}
