import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  listLinks,
  deleteLink,
  createLink,
} from '../actions/linkActions'
import { LINK_CREATE_RESET } from '../constants/linkConstants'

const LinkListScreen = ({ history, match }) => {
//   const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const linkList = useSelector((state) => state.linkList)
  const { loading, error, links } = linkList
//   , page, pages

  const linkDelete = useSelector((state) => state.linkDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = linkDelete

  const linkCreate = useSelector((state) => state.linkCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    link: createdLink,
  } = linkCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: LINK_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin ) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/link/${createdLink._id}/edit`)
    } else {
      dispatch(listLinks(''))
    //   , pageNumber
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdLink,
    // pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteLink(id))
    }
  }

  const createLinkHandler = () => {
    dispatch(createLink())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Links</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createLinkHandler}>
            <i className='fas fa-plus'></i> Create Link
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
             
                <th>DESCRIPTION</th>
                <th>PUBLISHED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link._id}>
                  <td>{link._id}</td>
                  <td>{}</td>

            <td>
                    <LinkContainer to={`/admin/link/${link._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(link._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                  <td>{link.isPublished?  (
                <>
                  <i className="fas fa-check"></i></>
              ) : (
                <> <i className='fas fa-times' style={{ color: 'red' }}></i></>
              )}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  )
}

export default LinkListScreen
