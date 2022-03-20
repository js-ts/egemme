import axios from 'axios'
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from '../constants/wishlistConstants'

export const addToWishlist = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)
  const {
    userLogin: { userInfo },
  } = getState()
  
  
  console.log(userInfo)

// const cartVar=`/api/users/cart/?id=${id}&qty=${qty}`
if(userInfo){
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  const { data:db } = await axios.put(`/api/users/wishlist/${userInfo._id}`,{wishlist:`id=${id}&qty=${qty}&`}, config)

  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

//
}
else{
    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        },
      })
    
}
 
  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}