const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    iscollection:false,
    image: [{images:"/images/airpods.jpg"}],
    livep:'',
    youtubeId:'',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    isCreated:true,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    iscollection:false,
    image: [{images:'/images/phone.jpg'}],
    livep:'',
    youtubeId:'',
    isCreated:true,
    description: 
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    iscollection:false,
    image: [{images:'/images/camera.jpg'}],
    livep:'',
    youtubeId:'',
    isCreated:true,
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    iscollection:false,
    image: [{images:'/images/playstation.jpg'}],
    livep:'',
    youtubeId:'',
    isCreated:true,
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    iscollection:false,
    image: [{images:'/images/mouse.jpg'}],
    livep:'',
    youtubeId:'',
    isCreated:true,
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    iscollection:false,
    image: [{images:'/images/alexa.jpg'}],
    livep:'',
    youtubeId:'',
    isCreated:true,
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {

    _id:'5fff196b7e40de3160439ccc',
    name: "Mac mini",
    iscollection:false,
    isCreated:true,
    image: 
      [{images:"/images/macmini.jpg"}],
      livep:'',
      youtubeId:'Y441774uB_o',

      description:"Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    
    brand: "Apple",
    category: "Electronics",

    price: 1099.99,
    color: "Black",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {

    _id:'5fff196b7e40de3160439ccd',
    name: "Apple iphone 11 pro",
    iscollection:false,
    isCreated:true,
    image: 
      [{images:"/images/iphonepro1.jpg"}],
    livep:'',
    youtubeId:"TCMnrssX1NE",
    isCreated:true,
      description:"Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
      
      brand: "Apple",
      category: "Electronics",

      price: 999.99,
      color: "Midnight Green",
      countInStock: 7,
      rating: 4.0,
    numReviews: 8,
  },
  {
   

    name: "Macbook air",
    iscollection:false,
    image: 
      [{images:"/images/macbookair.jpg"}],
    livep:'',
    isCreated:true,
    youtubeId:'Y441774uB_o',

      _id:'5fff196b7e40de3160439cce',
      description: "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",

    price: 399.99,
    color: "Black",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
  
    _id:'5fff196b7e40de3160439ccf',
    name: "Apple Watch series 5",
    iscollection:false,
    image: 
      [{images:"/images/Applewatch.jpeg"}],
    livep:'',
    isCreated:true,
    youtubeId:'TCMnrssX1NE',

      description:"Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
     
    brand: "Apple",
    category: "Electronics",

    price: 399.99,
    color: "Black",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
  
    _id:'5fff196b7e40de3160439cd0',
    name: "Apple Homepod",
    iscollection:false,
    image: 
      [{images:"/images/Applehomepod.jpg"}],
    livep:'',
    isCreated:true,
    youtubeId:'jQF5Q3773uk',

      description:"Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
     
    model: "Apple Homepod",
    category: "Electronics",

    price: 399.99,
    color: "Black",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Apple collection',
    iscollection:true,
    image: [{images:'/images/AppleCollection.jpg'}],
    livep:'',
    youtubeId:'RuurVkEXSP0',
    isCreated:true,
    description:
      'Apple collection',
    sProducts:[
    {
      x: 13,
      y: 21,
      name: "Mac mini",
      image: 
        [{images:"/images/macmini.jpg"}],
        livep:'',
    youtubeId:'bjcmnVkPptQ',

      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
      _id:'5fff196b7e40de3160439ccc',

      price: 1099.99,
      color: "Black",
      countInStock: 7,
      numReviews: 8,
    },
    {
      x: 28,
      y: 30,
     
      name: "Apple iphone 11 pro",
      image: 
        [{images:"/images/iphonepro1.jpg"}],
    livep:'',
    youtubeId:"TCMnrssX1NE",


       
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
      _id:'5fff196b7e40de3160439ccd',

      price: 999.99,
      color: "Midnight Green",
      countInStock: 7,
      numReviews: 8,
    },
    {
      x: 43,
      y: 10,
      name: "Macbook air",
      image: 
        [{images:"/images/macbookair.jpg"}],
    livep:'',
    youtubeId:'Y441774uB_o',

       
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
      _id:'5fff196b7e40de3160439cce',

      price: 999.99,
      color: "Black",
      countInStock: 7,
      numReviews: 8,
    },
    {
      x: 57,
      y: 40,
     
      name: "Apple Watch series 5",
      image: 
        [{images:"/images/Applewatch.jpeg"}],
    livep:'',
    youtubeId:'TCMnrssX1NE',
       
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
      _id:'5fff196b7e40de3160439ccf',

      price: 399.99,
      color: "Black",
      countInStock: 7,
      numReviews: 8,
    },
    {
      x: 70,
      y: 20,
      name: "Apple Homepod",
      image: 
        [{images:"/images/Applehomepod.jpg"}],
    livep:'',
    youtubeId:'jQF5Q3773uk',

       
      model: "Apple Homepod",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
      _id:'5fff196b7e40de3160439cd0',
      price: 399.99,
      color: "Black",
      countInStock: 7,
      numReviews: 8,
    },
  ],
    brand: 'Apple',
    category: 'Electronics',
    price: 29.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    _id: "601962c11026b713e00e5620",
    isCreated:true,
    rating: 0,
    numReviews: 0,
    price: 150,
    countInStock: 11,
    name: "Pokedex",
    user:  "60186cf9b1b77c6728f73886",
    iscollection: false,
    image: [{images:"/images/Pokedex.png"}],
    brand: "Pokemon",
    category: "Electronics",
  description: "The Pokédex (Japanese: ポケモン図鑑 illustrated Pokémon encyclopedia) is a digital encyclopedia created by Professor Oak as an invaluable tool to Trainers in the Pokémon world. ... They may give background information on the habitat or activities of a Pokémon in the wild or other information on the Pokémon's history or anatomy.",
    reviews: [],
   
    youtubeId:'WMlH2EzCnFQ',
    livep: "http://localhost:4000/gist/52ba3f209b842e56f719e1307d2c77df"
}
]

export default products
