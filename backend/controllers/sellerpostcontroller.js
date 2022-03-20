// import asyncHandler from 'express-async-handler'
// // import { isValidObjectId } from 'mongoose'
// import Post from '../models/postModel.js'

// // @desc    Fetch all posts
// // @route   GET /api/posts
// // @access  Public
// const getSellerPosts = asyncHandler(async (req, res) => {
//   // const pageSize = 12
//   // const page = Number(req.query.pageNumber) || 1

//   const keyword = req.query.keyword
//     ? {
//       name: {
//         $regex: req.query.keyword,
//         $options: 'i',
//       },
//     }
//     : {}
//     console.log('here0')
//   const count = await Post.countDocuments({ ...keyword })
//   const posts = await Post.find({ ...keyword })
//   // .limit(pageSize)
//   // .skip(pageSize * (page - 1))

//   res.json({ posts })
//   // page, pages: Math.ceil(count / pageSize)
// })

// // @desc    Fetch single post
// // @route   GET /api/posts/:id
// // @access  Public
// const getSellerPostById = asyncHandler(async (req, res) => {
//   const post = await Post.findById(req.params.id)
  
//   if (post) {
//     console.log('here1')
//     res.json(post)
//   } else {
//     res.status(404)
//     throw new Error('Post not found')
//   }
// })
// // @desc    Fetch single post by user
// // @route   GET /api/posts/:id
// // @access  Public
// const getSellerPostByUser = asyncHandler(async (req, res) => {
//   const uid = req.query.uid

//   // const post = await Post.find({ user: ObjectId('6030bdf61f6b361344f98d8d')})
//   const posts = await Post.find({ 'user' :  ObjectId(uid)})
//   // console.log(await Post.find({ user: ObjectId('6030bdf61f6b361344f98d8d')}))
//   if (posts) {
//     const uposts = posts.filter(x=>x._id===uid)
//     console.log('here2')
   
//     console.log(uposts)
//     res.json({uposts})
//   } else {
//     res.status(404)
//     throw new Error('Post not found')
//   }
// })

// const deleteSellerPost = asyncHandler(async (req, res) => {
//   const post = await Post.findById(req.params.id)

//   if (post) {
//     console.log('here3')

//     await post.remove()
//     res.json({ message: 'Post removed' })
//   } else {
//     res.status(404)
//     throw new Error('Post not found')
//   }
// })

// // @desc    Create a post
// // @route   POST /api/posts
// // @access  Private/Admin
// // @acess Privste/Seller
// const createSellerPost = asyncHandler(async (req, res) => {
//   // console.log(req)
//   const post = new Post({
//     user: req.user._id,
//    data:{time:new Date().getTime()
//     ,
//     blocks: [
//       {
//         type: "header",
//         data: {
//           text: "",
//           level: 2
//         }
//       },
//       {
//         type: "paragraph",
//         data: {
//           text:
//             ""
//         }
//       }
//     ],
//     version: "2.12.4"
//   },
//   likes: [],
//   isPublished:false,
//   reviews: [],
//   numReviews: 0

//   })

//   const createdPost = await post.save()
//   res.status(201).json(createdPost)
// })

// // @desc    Update a post
// // @route   PUT /api/posts/:id
// // @access  Private/Admin
// // @acess Privste/Seller

// const updateSellerPost = asyncHandler(async (req, res) => {
//   const {
//     data,
//     reviews,
//     numReviews
//   } = req.body

//   console.log('updatePost')
   
//   const post = await Post.findById(req.params.id)

//   if (post) {
//     post.data = data
//     post.reviews = reviews
//     post.isPublished = true
//     post.numReviews = numReviews

//     const updatedPost = await post.save()
//     res.json(updatedPost)
//   } else {
//     res.status(404)
//     throw new Error('Post not found')
//   }
// })

// // @desc    Update a post
// // @route   PUT /api/posts/:id/save
// // @access  Private/Admin
// // @acess Privste/Seller

// const savedSellerUpdatePost = asyncHandler(async (req, res) => {
//   const {
//     data,
//     reviews,
//     numReviews
//   } = req.body
//   console.log('savedUpdatePost')
   
//   const post = await Post.findById(req.params.id)

//   if (post) {
//     post.data = data
//     post.reviews = reviews
//     post.numReviews = numReviews

//     const updatedPost = await post.save()
//     res.json(updatedPost)
//   } else {
//     res.status(404)
//     throw new Error('Post not found')
//   }
// })

// // @desc    Create new review
// // @route   POST /api/posts/:id/reviews
// // @access  Private
// const createSellerPostReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body

//   const post = await Post.findById(req.params.id)

//   if (post) {
//     const alreadyReviewed = post.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     )

//     if (alreadyReviewed) {
//       res.status(400)
//       throw new Error('Post already reviewed')
//     }

//     const review = {
//       name: req.user.name,
//       image:req.user.image,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     }

//     post.reviews.push(review)

//     post.numReviews = post.reviews.length

//     post.rating =
//       post.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       post.reviews.length

//     await post.save()
//     res.status(201).json({ message: 'Review added' })
//   } else {
//     res.status(404)
//     throw new Error('Post not found')
//   }
// })

// // @desc    Get top rated posts
// // @route   GET /api/posts/top
// // @access  Public
// const getSellerTopPosts = asyncHandler(async (req, res) => {
//   const posts = await Post.find({}).sort({ rating: -1 }).limit(3)

//   res.json(posts)
// })

// const likePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }
//     // Check if the post has already been liked by this user
//     if (post.likes.some((l) => l.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post already liked' });
//     }
//     post.likes.unshift({ user: req.user.id });
//     await post.save();
//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Post not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// };

// const unlikePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: 'Post not found' });
//     }

//     // Check if the post has not yet been liked by this user
//     if (!post.likes.some((l) => l.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Post has not yet been liked' });
//     }

//     // remove like
//     post.likes = post.likes.filter((l) => {
//       l.user.toString() !== req.user.id;
//     });

//     await post.save();

//     return res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Post not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// };

// export {
//   getPosts,
//   getPostById,
//   getPostByUser,
//   deletePost,
//   createPost,
//   updatePost,
//   savedUpdatePost,
//   createPostReview,
//   getTopPosts,
//   likePost,
//   unlikePost
// }