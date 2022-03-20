import asyncHandler from 'express-async-handler'
// import { isValidObjectId } from 'mongoose'
import Post from '../models/postModel.js'

const getPostByUser = asyncHandler(async (req, res) => {
    const uid = req.query.uid
    const posts = await Post.find({user:uid,isPublished:true})
    console.log(posts)
    if (posts) {
        // const posts = posts.filter(x=>x.user===ObjectId(uid))
        console.log('here2')
        
        // console.log(uposts)
        // res.json({uposts})
        res.json({posts})
    } else {
        console.log('error here')
      res.status(404)
      throw new Error('Post not found')
    }
  })

  const getAllPostByUser = asyncHandler(async (req, res) => {
    const uid = req.query.uid
    const posts = await Post.find({user:uid})
    console.log(posts)
    if (posts) {
        // const posts = posts.filter(x=>x.user===ObjectId(uid))
        console.log('here2')
        
        // console.log(uposts)
        // res.json({uposts})
        res.json({posts})
    } else {
        console.log('error here')
      res.status(404)
      throw new Error('Post not found')
    }
  })

export { getPostByUser,getAllPostByUser}