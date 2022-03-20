import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import PostScreen from './screens/PostScreen'
import MobileView from './screens/MobileView'
import MobileMaker from './screens/MobileMaker'
import ModalProduct from './screens/ModalProduct'
import CartScreen from './screens/CartScreen'
import Routes from './ModalRoutes';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductVariantEditScreen from './screens/ProductVariantEditScreen'
import PostListScreen from './screens/PostListScreen'
import PostEditScreen from './screens/PostEditScreen'
import LinkListScreen from './screens/LinkListScreen'
import ListEditScreen from './screens/ListEditScreen'
import ReactEditor from './screens/editor/editor'
import Viewer from './screens/editor/PostViewScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PostEditScreenSeller from './screens/PostEditScreenSeller'
import Cropper from './screens/Cropper'
import OrderListScreen from './screens/OrderListScreen'
import UserOrderListScreen from './screens/UserOrderListScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import { Provider } from 'react-redux'
import store from './store'
import PostListScreenSeller from './screens/PostListScreenSeller'
import SelectScreen from './screens/SelectScreen'
import Gallery from './components/Gallery'
import WishlistScreen from './screens/WishlistScreen'
import UserLinkTree from './screens/link/UserLinkTree'
import ErrorComponent from './screens/404'
import { LinksContextProvider } from './links-context';
import PublicProfileScreen from './screens/PublicProfileScreen'
import Maker from './screens/Maker'
const App = () => {
  return (
    <Router>

     {!/\/link\//.test(window.location.href)? (
      <Provider store={store}>
     <>

     <Header />
      <main className='py-3'>
        <Container>
         
          <Route path='/' component={HomeScreen} exact />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path="/reset-password" component={ResetPasswordScreen} />
          <Route path="/forgot-password" component={ForgotPasswordScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/select' component = {SelectScreen}/>
          <Route path='/cropper' component = {Cropper}/>
          <Route path='/gallery' component = {Gallery} />
          <Route path='/mobile' component = {MobileView} />
          <Route path='/meditor' component = {MobileMaker} />

          <Route path='/maker' component = {Maker} />

          
          {/* <Route path='/vform' component = {ProductVariantEditScreen} /> */}
          {/* <Route path='/profile/:id' component={ProfileScreen} exact/> */}

          <Route path='/profileEdit' component={UserProfileScreen} />
          <Route path='/u/:username' component={PublicProfileScreen}/>

          <Route path='/orders' component={UserOrderListScreen} />

          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/post/:id' component={PostScreen} />
          <Route path='/Editor' component={ReactEditor}/>
          <Route path='/Viewer' component={Viewer}/>
          {/* <Route path='/product/:id/:pid' component={ModalProduct}  /> */}
          <Routes/>
          <Route path='/cart/:id?' component={CartScreen} />
          
          <Route path='/wishlist/:id?' component={WishlistScreen} />

          
          
           <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route 
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          {/* <Route path='/admin/product/:id/edit' component={ProductEditScreen} /> */}
          <Route path='/admin/product/:id/edit' component={ProductVariantEditScreen} />


          <Route
            path='/admin/postlist'
            component={PostListScreen}
            exact
          />
          
          <Route
            path='/admin/linklist'
            component={LinkListScreen}
            exact
          />

       <Route path='/admin/post/:id/edit' component={PostEditScreen} />
       <Route path='/admin/link/:id/edit' component={ListEditScreen} />

       
          
          <Route path='/admin/orderlist' component={OrderListScreen} />
            
          

          <Route
            path='/seller/productlist'
            component={ProductListScreen}
            exact
          />
          <Route 
            path='/seller/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/seller/product/:id/edit' component={ProductEditScreen} />

          <Route
            path='/seller/postlist'
            component={PostListScreenSeller}
            exact
          />
       <Route path='/seller/post/:id/edit' component={PostEditScreenSeller} />
          
          <Route path='/seller/orderlist' component={OrderListScreen} />



          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
        
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
        

        </Container>
      </main>
      <Footer />

      </>
      </Provider>
      ):(
        <LinksContextProvider>
        <Route path='/link/:username/:id' component={UserLinkTree} />
        <Routes/>
</LinksContextProvider>
      )}
    </Router>
  )
}

export default App
