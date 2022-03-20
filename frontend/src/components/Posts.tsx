import React from 'react'
import { Card , Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { addLike, removeLike } from '../actions/postActions';


const Posts = ({ post }) => {
    function unlike(_id){
        removeLike(_id) 
        console.log(_id)
    }

    function like(_id){
        addLike(_id) 
        console.log(_id)
    }
    return (
            <Card className='my-3 p-3 rounded'>
                <Link to={`/post/${post._id}`}>
                    {/* <Card.Img src={post.image} variant='top' /> */}
                </Link>

                <Card.Body>
                    <Link to={`/post/${post._id}`}>
                        <Card.Title as='div'>
                            <strong>{post.data.blocks[0].data.text}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Rating
                            value={post.rating}
                            text={`${post.numReviews} reviews`}
                        />
                    </Card.Text>

                </Card.Body>
                <Row>
                <button
              type='button'
              onClick={() => like(post._id)}
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>{post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
            </button>
            <button
              type='button'
              onClick={()=>unlike(post._id)}
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            </Row>
            </Card>
    )
}

export default Posts
