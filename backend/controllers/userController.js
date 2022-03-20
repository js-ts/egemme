import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const {  email,password } = req.body
  console.log(req.body)
  const user = (/[0-9a-zа-я_A-ZА-Я]+@[0-9a-zа-я_A-ZА-Я^.]+\.[a-zа-яА-ЯA-Z]{2,4}/i.test(email))? await User.findOne({ 'email':email }) : await User.findOne({ 'username':email })
  console.log(user)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username:user.username,
      image:user.image,
      description: user.description,
      isAdmin: user.isAdmin,
      isSeller:user.isSeller,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username,email, password ,image,description} = req.body
 console.log(username)
  const userExists = await User.findOne({ email })
  const usernameExists =await User.findOne({ 'username':username })
  const email_regexp = /[0-9a-zа-я_A-ZА-Я]+@[0-9a-zа-я_A-ZА-Я^.]+\.[a-zа-яА-ЯA-Z]{2,4}/i;
  const username_regexp= /^[a-z][a-z]+\d*$/mi
  const password_regexp=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/gm;
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  if (usernameExists) {

    res.status(400)
    throw new Error('Username already exists')
  }
  if (!password_regexp.test(password)) {
    throw new Error('password must contain 1 number (0-9)\n password must contain 1 uppercase letters\n password must contain 1 lowercase letters\n password must contain 1 non-alpha numeric number\n password more than 8 characters with no space')
                                        }
    if (!username_regexp.test(username)) {
     throw new Error('The username should be at least 2 characters long\n can have lower and uppercase letters\n can only have numbers in the end.')
                                        }
  if (!email_regexp.test(email)) {
    throw new Error('Enter correct email address')
                                   }
  const user = await User.create({
    name,
    username,
    email,
    password,
    image,
    description
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username:user.username,
      email: user.email,
      image:user.image,
      description: user.description,
      token: generateToken(user._id),
    })
    // isAdmin: user.isAdmin,
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
 console.log(user)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username:user.username,
      email: user.email,
      image:user.image,
      description: user.description,
      followers:user.followers,
      following:user.following,
      isAdmin: user.isAdmin,
      isSeller:user.isSeller

    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const email_regexp = /[0-9a-zа-я_A-ZА-Я]+@[0-9a-zа-я_A-ZА-Я^.]+\.[a-zа-яА-ЯA-Z]{2,4}/i;
  const password_regexp=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;
  if (user) {
    user.name = req.body.name || user.name
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.image = req.body.image || user.image,
    user.description = req.body.description || user.description
    user.isSeller = req.body.isSeller || user.isSeller
    console.log(user)
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      image:updatedUser.image,
      description: user.description,
      isSeller:updateUser.isSeller,
      token: generateToken(updatedUser._id),
    })
    // isAdmin: updatedUser.isAdmin,
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByUserName = asyncHandler(async (req, res) => {
  const user = await User.findOne({username:req.params.username})

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.image = req.body.image || user.image,
    user.description = req.body.description || user.description
   , user.isSeller = req.body.isSeller || body.isSeller
   
    // ,user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image:updatedUser.image,
      description:updatedUser.description,
      isSeller: updatedUser.isSeller,
    })
    // isAdmin: updatedUser.isAdmin,
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Update cart
// @route   PUT /api/users/cart/:id
// @access  Private/Admin
const addtoCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  // const {cart} =req.body
  // let cartString = cart
console.log(req.body.cart)
  console.log(user)
  if (user) {
console.log(req.body.cart)

    // user.cart = req.body.cart || user.cart
    // ,user.isAdmin = req.body.isAdmin
    user.cart+=req.body.cart || user.cart
    const updatedUser = await user.save()


    res.json({
    cart:updatedUser.cart
    })
    // isAdmin: updatedUser.isAdmin,
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Update cart
// @route   PUT /api/users/cart/:id
// @access  Private/Admin
const addtoWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  // const {cart} =req.body
  // let cartString = cart
console.log(req.body.wishlist)
  console.log(user)
  if (user) {
console.log(req.body.wishlist)

    // user.cart = req.body.cart || user.cart
    // ,user.isAdmin = req.body.isAdmin
    user.wishlist+=req.body.wishlist || user.wishlist
    const updatedUser = await user.save()


    res.json({
    cart:updatedUser.wishlist
    })
    // isAdmin: updatedUser.isAdmin,
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const follow = asyncHandler(async (req, res) => {
  try {
    // Check if user exists
    const profile = await User.findOne({ username: req.params.username });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Check if user is trying to follow himself/herself
    if (req.params.userame === req.user.id.toString()) {
      return res.status(400).json({ msg: "You cannot follow yourself" });
    }

    // Check if user is already following
    if (
      profile.followers.filter(
        (follower) => follower.user.toString() === req.user.username
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You are already following this user" });
    }

    // Otherwise, handle followers and following
    await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: { following: { user: req.params.username } },
      }
    );

    await User.findOneAndUpdate(
      { user: req.params.username },
      {
        $push: { followers: { user: req.user.username } },
      }
    );

    res.json({ msg: "User followed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
})

const unfollow=asyncHandler(async (req, res) => {
  try {
    // Check if user exists
    const profile = await User.findOne({ username: req.params.username });
    if (!profile) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if user is trying to follow himself/herself
    if (req.params.username === req.user.id.toString()) {
      return res.status(400).json({ msg: "You cannot unfollow yourself" });
    }

    // Check if user is following in the first place
    if (
      profile.followers.filter(
        (follower) => follower.user.toString() === req.params.username
      ).length === 0
    ) {
      return res.status(400).json({ msg: "You are not following this user" });
    }

    // Otherwise, handle followers and following
    await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: { following: { username: req.params.username } },
      }
    );

    await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: { followers: { username: req.parmas.username } },
      }
    );
    res.json({ msg: "User unfollowed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    res
      .status(500)
      .send("There was an issue with the server. Try again later.");
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  getUserByUserName,
  updateUser,
  addtoCart,
  addtoWishlist,
  follow,
  unfollow
}
