import mongoose from 'mongoose'
import slugify from "slugify";

//Post Schema
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
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

const postSchema = new mongoose.Schema(
  {
    image:
    {type: String},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {type:String},
    markdown: {
      type: String,
     
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      required: true,
     
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
  },
  {
    timestamps: true,
  }
);

postSchema.pre("validate", function(next) {
  const post = this;
  
  if(post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }

  next();
})

const Post = mongoose.model("Post", postSchema);

//Export
export default Post;
