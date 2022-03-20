import mongoose from 'mongoose'

const carouselSchema = mongoose.Schema(
    {
     name:{ type: String},
     image: { type: String},
     link:{ type: String},
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
      }
     },
    {
        timestamps: true
      }   
  )

const Carousel = mongoose.model('Carousel', carouselSchema)
export default Carousel
  