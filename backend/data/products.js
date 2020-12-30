const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    iscollection:false,
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    iscollection:false,
    image: '/images/phone.jpg',
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
    image: '/images/camera.jpg',
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
    image: '/images/playstation.jpg',
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
    image: '/images/mouse.jpg',
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
    image: '/images/alexa.jpg',
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
    x: 13,
    y: 21,
    name: "Mac mini",
    iscollection:false,

    image: 
      "/images/macmini.jpg",
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
    x: 28,
    y: 30,
    
    name: "Apple iphone 11 pro",
    iscollection:false,
    image: 
      "/images/iphonepro1.jpg",
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
    x: 43,
    y: 10,

    name: "Macbook air",
    iscollection:false,
    image: 
      "/images/macbookair.jpg",
     
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
    x: 57,
    y: 40,
    
    name: "Apple Watch series 5",
    iscollection:false,
    image: 
      "/images/Applewatch.jpeg",
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
    x: 70,
    y: 20,
    
    name: "Apple Homepod",
    iscollection:false,
    image: 
      "/images/Applehomepod.jpg",
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
    image: '/images/AppleCollection.jpg',
    description:
      'Apple collection',
    sProducts:[
    {
      x: 13,
      y: 21,
      name: "Mac mini",
      image: 
        "/images/macmini.jpg",
      
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
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
        "/images/iphonepro1.jpg",
       
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
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
        "/images/macbookair.jpg",
       
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
      price: 399.99,
      color: "Black",
      countInStock: 7,
      numReviews: 8,
    },
    {
      x: 57,
      y: 40,
     
      name: "Apple Watch series 5",
      image: 
        "/images/Applewatch.jpeg",
       
      brand: "Apple",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
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
        "/images/Applehomepod.jpg",
       
      model: "Apple Homepod",
      category: "Electronics",
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",

      rating: 4.0,
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
]

export default products
