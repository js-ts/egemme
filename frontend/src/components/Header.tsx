import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import { Thumbnail, Avatar } from './Thumbnail'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const logoutHandler = () => {
    dispatch(logout())
  }
  console.log(userInfo)

  return (
    <header style={{
      paddingTop: 0,
      paddingBottom: 0,
    }}>
      <Navbar variant='dark' expand='lg' collapseOnSelect style={{
        background: 'black',
        padding: 0
      }}>
        <Container>
          <LinkContainer className="brand-logo" to='/'>
            <Navbar.Brand>egemme</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            {/* <div style={{ width: 2, margin: 20 }}>
            <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            styling={{ zIndex: 1 }} // To display it on top of the search box below
            autoFocus
          />
          </div> */}
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <div style={{display:'flex',flexDirection:'row'}}>

                  <i className='fas fa-shopping-cart fa-2x'></i>
                  {/* 
                  <span style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    display: "inline-block",
                    width: "1em",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    color: "white",
                  }}>
                  {' '}{cartItems.length}
                  
                </span> */}
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'flex-end', alignContent: 'flex-end', flexDirection: 'column' }}>

                    <span style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      color: 'white',
                      // position: 'absolute',
                      // top: '-5px',
                      // right: '-5px',
                      display: 'flex',
                      // display: "inline-block",
                      
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}> {' '}{cartItems.length}

                    </span>
                  </div>
                    </div>

                  {/* 
                                    <span className="fa-stack">
                  <span className="fa fa-circle-o fa-stack-2x"></span>
                  <strong className="fa-stack-1x">
                  </strong>
                  </span> */}

                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={
                  <Thumbnail
                    source={userInfo.image}
                    size="xs"
                    description="pic"
                    shape="round"
                  />
                }
                  id="profile-dropdown" >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/profileEdit'>
                    <NavDropdown.Item>Profile Edit</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/linklist'>
                    <NavDropdown.Item>Link List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/link/Vedant/6071f71d3894ba421c6f627f'>
                    <NavDropdown.Item>Link Page</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user fa-2x'></i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {(userInfo && userInfo.isAdmin) ? (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/postlist'>
                    <NavDropdown.Item>Posts</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (userInfo && userInfo.isSeller) ?
                (
                  <NavDropdown title='Seller' id='sellermenu'>
                    <LinkContainer to='/seller/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/seller/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/seller/postlist'>
                      <NavDropdown.Item>Posts</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : (
                  null
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
