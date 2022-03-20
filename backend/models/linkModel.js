import mongoose from 'mongoose'

const EditorSchema = mongoose.Schema(
    {
        time: {
            type: Number,
            default: new Date().getTime(),
        },
        blocks:{
            type: Array
        },
        version:{
          type:String
        }
    }
)

const slinkSchema = mongoose.Schema({
    url: {
      type: String,
      required: true
    },
    linkTitle: {
      type: String,
      required: true
    },
    data:EditorSchema,
    thumbnail: {
      type: String,
      required: true
    },
});

const linkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },

      theme: {
        type: Number,
        default: 1
      },
      isDefault:{
        type:Boolean,
        default:false
      },
      image:{
        type:String
      },
      links: {
        type: [slinkSchema]
      }
    },
      {
          timestemps:true
      }
)


const Link = mongoose.model('Link', linkSchema)

export default Link