import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },

    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)


const imageSchema = mongoose.Schema(
  {
   
    images: { type: String},

  }
)
// user: {
//   type: mongoose.Schema.Types.ObjectId,
//   required: true,
//   ref: 'User',
// }, will add sp.map add and it below \|/
const sProductSchema=mongoose.Schema(
  {
    name: {
      type: String,
    },
    x: { type: Number },
    y: { type: Number },
    image: [imageSchema],
    youtubeId:{
      type:String
    },
    livep:{
      type:String
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
   
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    }
  }
)

const productSchema = mongoose.Schema(
  {
    x: { type: Number },
    y: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    iscollection: {
      type: Boolean,
      // required: true,
    },
    image:  [imageSchema],
    youtubeId:{
      type:String
    },
    livep:{
      type:String
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sProducts:[sProductSchema],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    isCreated:{type:Boolean,default:false},
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)
// const ProductCollection = mongoose.model('ProductCollection',sProductSchema)

export default Product
