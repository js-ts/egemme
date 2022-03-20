import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productUpdateStockReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'
import { wishlistReducer } from './reducers/wishlistReducers'
import {
  postListReducer,
  postDetailsReducer,
  userPostDetailsReducer, 
  userAllPostDetailsReducer,
  postDeleteReducer,
  postCreateReducer,
  postUpdateReducer,
  postReviewCreateReducer,
  postTopRatedReducer,
  postUpdateLikesReducer
} from './reducers/postReducers'
import {
  linkListReducer,
  linkDetailsReducer,
  userLinkDetailsReducer, 
  userAllLinkDetailsReducer,
  linkDeleteReducer,
  linkCreateReducer,
  linkUpdateReducer,
  linkReviewCreateReducer,
  linkTopRatedReducer,
  linkUpdateLikesReducer
} from './reducers/linkReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userPageDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productUpdateStock:productUpdateStockReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  postList: postListReducer,
  postDelete:postDeleteReducer,
  listUserPostDetails:userPostDetailsReducer,
  listAllUserPostDetails:userAllPostDetailsReducer,
  postCreate:postCreateReducer,
  postUpdate:postUpdateReducer,
  postReviewCreate:postReviewCreateReducer,
  postDetails: postDetailsReducer,
  postTopRated:postTopRatedReducer,
  postUpdateLikes:postUpdateLikesReducer,

  linkList:linkListReducer,
  linkDetails:linkDetailsReducer,
  userLinkDetails:userLinkDetailsReducer, 
  userAllLinkDetails:userAllLinkDetailsReducer,
  linkDelete:linkDeleteReducer,
  linkCreate:linkCreateReducer,
  linkUpdate:linkUpdateReducer,
  linkReviewCreate:linkReviewCreateReducer,
  linkTopRated:linkTopRatedReducer,
  linkUpdateLikes:linkUpdateLikesReducer,

  cart: cartReducer,
  userLogin: userLoginReducer,
  userPageDetails:userPageDetailsReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,

  wishlist:wishlistReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export type RootStore = ReturnType<typeof reducer>;

export default store
