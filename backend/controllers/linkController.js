import asyncHandler from 'express-async-handler'
// import { isValidObjectId } from 'mongoose'
import Link from '../models/linkModel.js'
import User from '../models/userModel.js'

// @desc    Fetch all links
// @route   GET /api/links
// @access  Public
const getLinks = asyncHandler(async (req, res) => {
  // const pageSize = 12
  // const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}
    console.log('here0')
  const count = await Link.countDocuments({ ...keyword })
  const links = await Link.find({ ...keyword })
  // .limit(pageSize)
  // .skip(pageSize * (page - 1))

  res.json({ links })
  // page, pages: Math.ceil(count / pageSize)
})

// @desc    Fetch single link
// @route   GET /api/links/:id
// @access  Public
const getLinkById = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id)
  const user = await User.findOne({username:req.params.username})
console.log(link)
console.log(user)
  if (link && user) 
  {
    // {username:req.params.username,theme:user.theme,avatar:user.image,socialLinks:user.socialLinks,bio:user.description,
    console.log('here1')
    res.json({username:req.params.username,theme:user.theme,avatar:user.image,socialLinks:user.socialLinks,bio:user.description,links:link})
  } else {
    res.status(404)
    throw new Error('Link not found')
  }
})
// @desc    Fetch single link by user
// @route   GET /api/links/:id
// @access  Public
const getLinkByUser = asyncHandler(async (req, res) => {
  const uid = req.query.uid

  // const link = await Link.find({ user: ObjectId('6030bdf61f6b361344f98d8d')})
  const links = await Link.find({ 'user' :  ObjectId(uid)})
  // console.log(await Link.find({ user: ObjectId('6030bdf61f6b361344f98d8d')}))
  if (links) {
    // const ulinks = links.filter(x=>x._id===uid)
    console.log('here2')
   
    // console.log(ulinks)
    res.json({links})
  } else {
    res.status(404)
    throw new Error('Link not found')
  }
})

const deleteLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id)

  if (link) {
    console.log('here3')

    await link.remove()
    res.json({ message: 'Link removed' })
  } else {
    res.status(404)
    throw new Error('Link not found')
  }
})

// @desc    Create a link
// @route   POST /api/links
// @access  Private/Admin
// @acess Privste/Seller
const createLink = asyncHandler(async (req, res) => {
  // console.log(req)
  const link = new Link({
    user: req.user._id,
    theme:0,
    isDefault:false,
    image:"sampple.jpg",
    links:[
        {
         url:"/",
           linkTitle:"home",
           thumbnail:"search-button.png",
           data:{
               time:new Date().getTime()
            ,
            blocks: [
              {
                type: "header",
                data: {
                  text: "",
                  level: 2
                }
              },
              {
                type: "paragraph",
                data: {
                  text:
                    ""
                }
              }
            ],
            version: "2.12.4"
          },
        }],
  likes: [],
  isPublished:false
  })

  const createdLink = await link.save()
  res.status(201).json(createdLink)
})

// @desc    Update a link
// @route   PUT /api/links/:id
// @access  Private/Admin
// @acess Privste/Seller

const updateLink = asyncHandler(async (req, res) => {
  const {
      theme,
      isDefault,
      image,
      links,
  } = req.body

  console.log('updateLink')
   
  const link = await Link.findById(req.params.id)

  if (link) {
    link.links = links
    link.theme = theme
    link.isDefault = isDefault
    link.image = image

    const updatedLink = await link.save()
    res.json(updatedLink)
  } else {
    res.status(404)
    throw new Error('Link not found')
  }
})

// @desc    Update a link
// @route   PUT /api/links/:id/save
// @access  Private/Admin
// @acess Privste/Seller

const savedUpdateLink = asyncHandler(async (req, res) => {
  const {
    data,
    reviews,
    numReviews
  } = req.body
  console.log('savedUpdateLink')
   
  const link = await Link.findById(req.params.id)

  if (link) {
    link.data = data
    link.reviews = reviews
    link.numReviews = numReviews

    const updatedLink = await link.save()
    res.json(updatedLink)
  } else {
    res.status(404)
    throw new Error('Link not found')
  }
})

// @desc    Get top rated links
// @route   GET /api/links/top
// @access  Public
const getTopLinks = asyncHandler(async (req, res) => {
  const links = await Link.find({}).sort({ rating: -1 }).limit(3)

  res.json(links)
})

const likeLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ msg: 'Link not found' });
    }
    // Check if the link has already been liked by this user
    if (link.likes.some((l) => l.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Link already liked' });
    }
    link.likes.unshift({ user: req.user.id });
    await link.save();
    return res.json(link.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Link not found' });
    }
    res.status(500).send('Server Error');
  }
};

const unlikeLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ msg: 'Link not found' });
    }

    // Check if the link has not yet been liked by this user
    if (!link.likes.some((l) => l.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Link has not yet been liked' });
    }

    // remove like
    link.likes = link.likes.filter((l) => {
      l.user.toString() !== req.user.id;
    });

    await link.save();

    return res.json(link.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Link not found' });
    }
    res.status(500).send('Server Error');
  }
};

export {
  getLinks,
  getLinkById,
  getLinkByUser,
  deleteLink,
  createLink,
  updateLink,
  savedUpdateLink,
  getTopLinks,
  likeLink,
  unlikeLink
}