import { getMetadata } from "page-metadata-parser";
import domino from "domino"
import fetch  from "node-fetch"
import asyncHandler from 'express-async-handler'

const metadata=asyncHandler(async (req,res)=> {
    const url = req.query.url.replace(/\+/g,  " ")
    console.log(url)
    const response = await fetch(url);
    console.log(response)
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
  console.log(metadata)
 const {title,description,image}= metadata
//  {
//        description: 'Enjoy the videos and music that you love, upload original content and share it all with friends, family and the world on YouTube.',
//        icon: 'https://www.youtube.com/s/desktop/de591bc6/img/favicon_96.png',
//        image: 'https://www.youtube.com/img/desktop/yt_1200.png',
//        keywords: [
//          'video',
//          'sharing',
//          'camera phone',
//          'video phone',
//          'free',
//          'upload'
//        ],
//        title: 'YouTube',
//        language: 'en',
//        type: undefined,
//        url: 'https://www.youtube.com/',
//        provider: 'youtube'
//      }
    try {
        res.json({
            "success" : 1,
            "meta": {
                "title" : title,
                "description" :description,
                "image" : {
                    "url" : image
                }
            }
        })
    } catch (error) {
        res.status(404)
        throw new Error('Link not found')
    }


  }
)


export default metadata