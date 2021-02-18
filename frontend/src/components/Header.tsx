import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

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


  return (
    <header style={{
      paddingTop: 0,
      paddingBottom: 0
    }}>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
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
                  <i className='fas fa-shopping-cart fa-2x'></i>

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

                  </span>

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
                  <img style={{
                    display: 'inline-block',

                    width: '3rem',
                    borderRadius: '50%'
                  }}
                    src={userInfo.image}
                    alt="user pic"
                  />}
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
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                  </LinkContainer>
                )}
              {userInfo && userInfo.isAdmin && (
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
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
