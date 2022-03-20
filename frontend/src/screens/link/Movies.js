import React, { useState,useContext } from 'react';
import LinksContext from '../../links-context';
//import MovieList from './MovieList';

import ReactImageZoom from 'react-image-zoom';

import { getCollectionByProductId, getProductById } from './data';
import { ModalLink } from "react-router-modal-gallery";
import styled from 'styled-components';

//import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
// import './Movie.css';
const Root = styled.div`
  padding: 12px;
`;
const Movie = ({
  match: {
    params: { pid }
  }
  ,links
}) => {
  const linksCtx = useContext(LinksContext);
console.log(linksCtx.Links)
  console.log(pid)
  console.log(links)
  const product = getProductById(pid);

  const collection = getCollectionByProductId(pid);

  const otherProducts = collection.products.filter(
    product => product.id !== pid
  );

  {
    /*display: "flex",
    justifyContent: "center",
    alignItems: "center"*/
  }
  const [currImg, setImg] = useState(product.ThumbArray[0]);

  const props = {
    width: 200,
    height: 300,
    zoomWidth: 350,
    zoomPosition: 'right',
    img: currImg
  };

  function changeImage(i) {
    setImg(i);
  }
  return (
    <Root>
      <div>
        <div className="productreview">
          <div className="center">
            <span>{product.title}</span>
          </div>

          <div>
            <div className="center3">
              <p>Price: {product.price}</p>
            </div>
            <div className="center1">
              <span className="dot"></span>
              <p>
                Color:
                <br />
                {product.color}
              </p>
            </div>
            <div className="center2">
              <p> Size:64GB </p>
            </div>

            <select id="qty">
              <option value="Qty: 1">Qty: 1</option>
              <option value="Qty: 2">Qty: 2</option>
              <option value="Qty: 3">Qty: 3</option>
              <option value="Qty: 4">Qty: 4</option>
            </select>

            <div id="box">
              <ReactImageZoom {...props} />
            </div>
            {/* <img style={{"height" : "300px", "width" : "250px"}} src={'https://m.media-amazon.com/images/I/81mxun+6pEL.jpg'}/> */}
          </div>
          <div id="main">
            {product.ThumbArray.map(img => (
              <div
                key={product.ThumbArray.indexOf(img)}
                onClick={() => {
                  changeImage(img);
                }}
              >
                <img src={img} style={{ height: '4vh', width: '4vw' }} />
                {/* <li key={product.ThumbArray.indexOf(img)}>
                <img src={img} />
              </li> */}
              </div>
            ))}
          </div>
        </div>

        {/* <div id="main1">
          <MovieList movies={otherMovies} />
        </div> */}
        <div id="main1">
          {otherProducts.map(products => (
            <div key={products.id}>
              <ModalLink to={`/${window.location.href.slice(21,58)}/${products.id}`}>
                <div
                  className="cell"
                  onClick={() => {
                    changeImage(products.ThumbArray[0]);
                  }}
                >
                  <img src={products.ThumbArray[0]} />{' '}
                  <p>
                    {' '}
                    {products.title}
                    <br />
                    Price:{products.price}
                  </p>
                </div>
              </ModalLink>
            </div>
          ))}
        </div>
      </div>

      {/* <Typography variant="h6">{product.title}</Typography>
      <img src={product.image}/>
      <ModalLink to={`/collections/${collection.id}`} style={{ fontSize: 14 }}>

        {collection.name}
      </ModalLink>
      <hr />
      <p>Other movies by {collection.name}:</p>
      <MovieList movies={otherMovies} /> */}
    </Root>
  );
};

Movie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      pid: PropTypes.string
    })
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.object)
};

export default Movie;

////Old Code

// import React from 'react';
// import MovieList from './MovieList';
// import Dropdown from './Dropdown';
// import ReactImageZoom from 'react-image-zoom';

// import { getcollectionByMovieId, getMovieById } from '../data';
// import { ModalLink } from '../../../src';
// import styled from 'styled-components';
// import { Typography } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import './Movie.css';

// const Root = styled.div`
//   padding: 12px;
// `;

// const Movie = ({
//   match: {
//     params: { id }
//   }
// }) => {
//   const product = getMovieById(id);

//   const collection = getcollectionByMovieId(id);

//   const otherMovies = collection.movies.filter(product => product.id !== id);
//   {
//     /*display: "flex",
//     justifyContent: "center",
//     alignItems: "center"*/
//   }
//   const props = {
//     width: 200,
//     height: 300,
//     zoomWidth: 350,
//     zoomPosition: 'right',
//     img: product.image
//   };

//   return (
//     <Root>
//       <div>
//         <div className="center">
//           <span>{product.title}</span>
//         </div>

//         <div>
//           <div className="center3">
//             <p>Price: {product.price}</p>
//           </div>
//           <div className="center1">
//             <span className="dot"></span>
//             <p>
//               Color:
//               <br />
//               {product.color}
//             </p>
//           </div>
//           <div className="center2">
//             <p> Size:64GB </p>
//           </div>

//           <select id="qty">
//             <option value="Qty: 1">Qty: 1</option>
//             <option value="Qty: 2">Qty: 2</option>
//             <option value="Qty: 3">Qty: 3</option>
//             <option value="Qty: 4">Qty: 4</option>
//           </select>

//           <div id="box">
//             <ReactImageZoom {...props} />
//           </div>
//           {/* <img style={{"height" : "300px", "width" : "250px"}} src={'https://m.media-amazon.com/images/I/81mxun+6pEL.jpg'}/> */}
//         </div>
//         <div id="main">
//           <div>
//             <img src="https://m.media-amazon.com/images/I/41Q0PRqeavL._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/4131ycq4QDL._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/31BFm30Q93L._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/41AisChzPDL._SS40_.jpg" />
//           </div>
//           <div>
//             <img src="https://m.media-amazon.com/images/I/31C+yq94rSL._SS40_.jpg" />
//           </div>
//         </div>
//         <div id="main1">
//           <MovieList movies={otherMovies} />
//         </div>
//       </div>

//       {/* <Typography variant="h6">{product.title}</Typography>
//       <img src={product.image}/>
//       <ModalLink to={`/collections/${collection.id}`} style={{ fontSize: 14 }}>

//         {collection.name}
//       </ModalLink>
//       <hr />
//       <p>Other movies by {collection.name}:</p>
//       <MovieList movies={otherMovies} /> */}
//     </Root>
//   );
// };

// Movie.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string
//     })
//   }).isRequired
// };

// export default Movie;
