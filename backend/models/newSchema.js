import mongoose from 'mongoose'


//Post Schema
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
const EditorSchema = mongoose.Schema(
    {
        time: {
            type: Decimal128,
            default: new Date().getTime(),
        },
        blocks:{
            type: Array
        }
    }
)

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        data:EditorSchema,
        createdAt: {
            type: Decimal128,
            default: new Date().getTime(),
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


const Post = mongoose.model("Post", postSchema);

export default Post;
