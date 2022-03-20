const collections = [
  {
    id: '1',
    name: 'Apple',
    images: [
      'https://www.wallpapertip.com/wmimgs/53-536266_apple-products.jpg',
      'https://m.media-amazon.com/images/I/513PVXt3K4L._AC_UY218_.jpg'
    ],
    products: [
      {
        id: '1-1',
        x: 23,
        y: 31,
        title: 'Apple iPhone 11 Pro',
        price: '$999.99',
        color: 'Midnight Green',
        ThumbArray: [
          'https://m.media-amazon.com/images/I/41Q0PRqeavL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
          'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
        ]
      },
      {
        id: '1-2',
        x: 38,
        y: 40,
        title: 'Mac mini',
        price: '$1,099',
        color: 'Space Grey',
        ThumbArray: [
          'https://m.media-amazon.com/images/I/513PVXt3K4L._AC_UY218_.jpg',
          'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
          'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
        ]
      },
      {
        id: '1-3',
        x: 67,
        y: 50,
        title: 'Macbook air',
        price: '$1,099',
        color: 'Rose Gold',

        ThumbArray: [
          'https://images-na.ssl-images-amazon.com/images/I/71thf1SYnGL._AC_SX425_.jpg',
          'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
          'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
        ]
      },
      {
        id: '1-4',
        x: 53,
        y: 20,
        title: 'Apple Watch series 5',
        price: '$499.99',
        color: 'Black',
        ThumbArray: [
          'https://m.media-amazon.com/images/I/71mbZF8PT1L._AC_UY218_.jpg',
          'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
          'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
        ]
      },
      {
        id: '1-5',
        x: 80,
        y: 30,
        title: 'Apple Homepod',
        price: '$399.99',
        color: 'Black',
        ThumbArray: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBOL1HkBoLutwtIPDOYt7bkYddZEFw7yMhJA&usqp=CAU',
          'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
          'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
          'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
        ]
      }
    ]
  }
];
export const getProductById = productId => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === productId);
};

export const getAllProducts = () => {
  let products = [];

  collections.forEach(collections => {
    // movies = [...director.movies];
    products = [...products, ...collections.products];
  });

  return products;
};

export const getAllimages = () => {
  let images = [];

  collections.forEach(director => {
    // movies = [...director.movies];
    images = [...images, ...director.images];
  });

  return images;
};

export const getCollectionById = collectionId => {
  return collections.find(collection => collection.id === collectionId);
};

export const getCollectionByProductId = productId => {
  for (let i = 0; i < collections.length; i++) {
    const product = collections[i].products.find(
      product => product.id === productId
    );
    if (product) {
      return collections[i];
    }
  }
};

export default collections;

// const collections = [
//   {
//     id: '1',
//     name: 'Apple',
//     movies: [
//       {
//         id: '1-1',
//         x: 23,
//         y: 31,
//         title: 'Apple iPhone 11 Pro',
//         price: '$999.99',
//         color: 'Midnight Green',
//         image: 'https://m.media-amazon.com/images/I/41Q0PRqeavL._SS40_.jpg',
//         ThumbArray: [
//           'https://m.media-amazon.com/images/I/41Q0PRqeavL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
//         ]
//       },
//       {
//         id: '1-2',
//         x: 38,
//         y: 40,
//         title: 'Mac mini',
//         price: '$1,099',
//         color: 'Space Grey',
//         image: 'https://m.media-amazon.com/images/I/513PVXt3K4L._AC_UY218_.jpg',
//         ThumbArray: [
//           'https://m.media-amazon.com/images/I/513PVXt3K4L._AC_UY218_.jpg',
//           'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
//         ]
//       },
//       {
//         id: '1-3',
//         x: 67,
//         y: 50,
//         title: 'Macbook air',
//         price: '$1,099',
//         color: 'Rose Gold',
//         image:
//           'https://images-na.ssl-images-amazon.com/images/I/71thf1SYnGL._AC_SX425_.jpg',
//         ThumbArray: [
//           'https://images-na.ssl-images-amazon.com/images/I/71thf1SYnGL._AC_SX425_.jpg',
//           'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
//         ]
//       },
//       {
//         id: '1-4',
//         x: 53,
//         y: 20,
//         title: 'Apple Watch series 5',
//         price: '$499.99',
//         color: 'Black',
//         image: 'https://m.media-amazon.com/images/I/71mbZF8PT1L._AC_UY218_.jpg',
//         ThumbArray: [
//           'https://m.media-amazon.com/images/I/71mbZF8PT1L._AC_UY218_.jpg',
//           'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
//         ]
//       },
//       {
//         id: '1-5',
//         x: 80,
//         y: 30,
//         title: 'Apple Homepod',
//         price: '$399.99',
//         color: 'Black',
//         image:
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBOL1HkBoLutwtIPDOYt7bkYddZEFw7yMhJA&usqp=CAU',
//         ThumbArray: [
//           'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBOL1HkBoLutwtIPDOYt7bkYddZEFw7yMhJA&usqp=CAU',
//           'https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg',
//           'https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg'
//         ]
//       }
//     ]
//   },
//   {
//     id: '2',
//     name: 'David Fincher',
//     movies: [
//       { id: '2-1', title: 'Social Network' },
//       { id: '2-2', title: 'The Girl with the Dragon Tattoo' },
//       { id: '2-3', title: 'Fight Club' },
//       { id: '2-4', title: 'Se7en' }
//     ]
//   }
// ];
