import axios from 'axios'
import React, { useState, useCallback,useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { ReactSearchAutocomplete } from "../components/search/index";

import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET, } from '../constants/productConstants'
// import { ImagesMap,MergeArray } from '../container';
import './ImagesMap.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// import CopyToClipboard from 'react-copy-to-clipboard';
// import {  message } from 'antd';
// import { ImageMap, Area } from '@qiuz/react-image-map'; 
import { ImageMap } from '../component';
import { Area } from '../component/image-map/index.d';

import EXAMPLE from './images/example.png';
import { getUrlParams } from '../common';
// import { arrayOf } from 'prop-types'
// import { Label } from '@material-ui/icons'
import "react-image-crop/dist/ReactCrop.css";
import { CallMergeTwoTone } from '@material-ui/icons'

// function generateDownload(canvas, crop) {
//   if (!crop || !canvas) {
//     return;
//   }

//   canvas.toBlob(
//     (blob) => {
//       const previewUrl = window.URL.createObjectURL(blob);

//       const anchor = document.createElement("a");
//       anchor.download = "cropPreview.png";
//       anchor.href = URL.createObjectURL(blob);
//       anchor.click();

//       window.URL.revokeObjectURL(previewUrl);
//     },
//     "image/png",
//     1
//   );

//   console.log(canvas.toDataURL("image/jpeg",1))
//  }

const ProductVariantEditScreen = ({ match, history }) => {
    const productId = match.params.id
    console.log(productId)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)


    const [livep, setLivep] = useState('')
    const [youtubeId, setYoutubeId] = useState('')
    const [brand, setBrand] = useState('')
    const [varanda, setVaranda] = useState(false)
    const [vartanda, setVartanda] = useState(false)
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [cropper, setCropper] = useState(false)
    const [variantList, setVariantList] = useState([{ value: "", type: "" }]);
    const [inputList, setInputList] = useState([{ name: "", price: "", image:[{ images: "" }], livep: "", brand: "", qty: "", category: "", description: "", url: "", variants:[ { value: "", type: "" } ]}]);
    const [urla, setUrla] = useState([])
    const [isUrla, ChangeUrla] = useState(false)
    const [currImg, setcurrImg] = useState('')
    const dispatch = useDispatch()
    // const dispatche=useDispatch()
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails;
    const productList = useSelector((state) => state.productList)
    const { products } = productList

    console.log(products)
    console.log(product)

    // console.log(product.image)
    const [inputimgList, setInputimgList] = useState([{ images: "" }]);
    console.log(inputimgList)
    const [image, setImage] = useState(inputimgList)
    console.log(image)



    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate


    const { imgSrc, postmessage } = getUrlParams();
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "px",maxWidth: 50, maxHeight: 50,aspect:1/1});
    const [completedCrop, setCompletedCrop] = useState(null);

    const generateDownload=(canvas, crop,index,subindex)=> {
        if (!crop || !canvas) {
          return;
        }
      
        // canvas.toBlob(
        //   (blob) => {
        //     const previewUrl = window.URL.createObjectURL(blob);
      
        //     const anchor = document.createElement("a");
        //     anchor.download = "cropPreview.png";
        //     anchor.href = URL.createObjectURL(blob);
        //     anchor.click();
      
        //     window.URL.revokeObjectURL(previewUrl);
        //   },
        //   "image/png",
        //   1
        // );
      
        const list = [...inputList];
        list[index]['variants'][subindex]['type'] =  list[index]['variants'][subindex]['type']+`,${crop.x*scaleX},${crop.y*scaleY},${crop.width*scaleX},${crop.height*scaleY},0,0,50,50`;
        setInputList(list);
        console.log(`${crop.x*scaleX},${crop.y*scaleY},${crop.width*scaleX},${crop.height*scaleY},0,0,50,50`)
       
        // console.log(canvas.toDataURL("image/jpeg",1))
       }
  
    const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const onLoad = useCallback((img) => {
      imgRef.current = img;
    }, []);




    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
        const Ap = [...urla]
        Ap.splice(index, 1);
        setUrla(Ap)


    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { name: "", price: "", image:[{ images: "" }], livep: "", brand: "", qty: "", category: "", description: "", url: "", variants: [{ value: "", type: "" }] }]);
        };
    //variant input list
    const handleRemoveVariantClick = (index,subindex) => {
        const list = [...inputList];
        list[index]['variants'].splice(subindex, 1);
        setInputList(list);
       };
    const handleVaraintInputChange = (e, index,subindex) => {
        const { name, value } = e.target;
        if(["color","colour","Color","Colour","COLOR","COLOUR"].includes(value) && name==="type"){
            console.log(["color","colour","Color","Colour","COLOR","COLOUR"].includes(value) && name==="type")
            setCropper(true)

        }
        const list = [...inputList];
        list[index]['variants'][subindex][name] = value;
        setInputList(list);
    };
   
    const handleAddVariantClick = (index) => {
        console.log(index)
        const list = [...inputList];
        list[index]['variants'] = [...list[index]['variants'] , { value: "", type: "" }];
        setInputList(list);
        // setVariantList([...variantList, { value: "", type: "" }])
    }
 //
 const handleRemoveVariantImgClick = (index,subindex) => {
    const list = [...inputList];
    list[index]['image'].splice(subindex, 1);
    setInputList(list);
   };
const handleVaraintInputImgChange = (e, index,subindex) => {

    const { name, value } = e.target;
    const list = [...inputList];
    list[index]['image'][subindex][name] = value;
    setInputList(list);
};

const handleAddVariantImgClick = (data,index) => {
    console.log(index)
    const list = [...inputList];
    list[index]['image'] = [...list[index]['image'] , { images: data }];
    setInputList(list);
    // setVariantList([...variantList, { value: "", type: "" }])
}
//
    const handleimgInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputimgList];
        list[index][name] = value;
        setInputimgList(list);
        setImage(inputimgList)
    };

    // handle click event of the Remove button
    const handleimgRemoveClick = (index) => {
        const list = [...inputimgList];
        list.splice(index, 1);
        setInputimgList(list);
        setImage(inputimgList)
    };
    // handle click event of the Add button
    const handleimgAddClick = (data) => {
        setInputimgList([...inputimgList, { images: data }]);
        setImage(inputimgList)
    };



    const [checked, setChecked] = useState(false);
    const [canda, setCanda] = useState(false)
    console.log(canda)
    const [final, finalize] = useState(false)
    console.log(final)
    const makeFinal = () => {
        finalize(!final)
    }
    const count = checked ? inputList.length : 0
    const handleChange = () => {
        setChecked(!checked);

    };
    const [ming, setMing] = useState(false);
    const handleMing = () => {
        setMing(!ming);

    };
    const iscollection = checked;
    useEffect(() => {
       
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch({ type: PRODUCT_DETAILS_RESET })
            history.push('/admin/productlist')
        } else {
            // dispatch(listProductDetails(productId))

            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
                console.log("dispatched")
                // dispatch(listProductDetails("5fff196b7e40de3160439cce"))
            } else {
                setName(product.name)
                setPrice(product.price)
                setcurrImg(product.image[0].images)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInSock)
                setDescription(product.description)
                setInputList(inputList)
                setLivep(product.livep)
                // setYoutubeId(product.youtubeId)
            }
        }
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
          }
          
          // completedCrop.width = 60
          // completedCrop.height = 60
          const image = imgRef.current;
          const canvas = previewCanvasRef.current;
          const crop = completedCrop;
          console.log(completedCrop)
      
          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
          const ctx = canvas.getContext("2d");
          const pixelRatio = window.devicePixelRatio;
      
          canvas.width = crop.width * pixelRatio;
          canvas.height = crop.height * pixelRatio;
      
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = "high";

      
       console.log(`${crop.x * scaleX},
       ${crop.y * scaleY},
        ${crop.width * scaleX},
            ${crop.height * scaleY},
        0,
        0,
      50,
        50`)
      
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
          50,
            50
          );
        //   canvas.width = 60;
        //   canvas.height = 60;
          console.log(ctx)


    }, [dispatch, history, productId, product, urla, successUpdate,completedCrop])

    const addUrla = (addl) => {
        dispatch(listProductDetails(addl))

        if (addl === product._id) {
            setUrla([...urla, product])
        }
    }





    const uploadFileHandler = async (e,i=786) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            // setImage(data)
            if(i!==786){
                handleAddVariantImgClick(data,i)
            setUploading(false)

            }
            handleimgAddClick(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    console.log(urla)
    const sProducts = (canda) ? inputList : urla
    console.log(sProducts)
    if (final && canda) {
        for (let i = 0; i < sProducts.length; i++) {

            sProducts[i].price = +sProducts[i].price
            sProducts[i].qty = +sProducts[i].qty


            console.log(sProducts)
        }
    }
    if (final && !canda) {
        for (let i = 0; i < sProducts.length; i++) {



            console.log(sProducts)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(
            (checked) ? updateProduct({
                _id: productId,
                name,
                price,
                iscollection,
                image,
                youtubeId,
                livep,
                brand,
                category,
                description,
                countInStock,
                sProducts
            })
                : updateProduct({
                    _id: productId,
                    name,
                    price,
                    iscollection,
                    image,
                    youtubeId,
                    livep,
                    brand,
                    category,
                    description,
                    countInStock
                })
        )

    }



    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                <i className="fas fa-long-arrow-alt-left fa-5x"></i>
            </Link>
            <FormContainer>
                {(product.isCreated) ? <h1>Create Product</h1> : <h1>Edit Product</h1>}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <label
                            htmlFor="ming"
                            className="switch switch-default"
                        >
                            Ming
                </label>
                        <input
                            id="ming"
                            type="checkbox"
                            checked={ming}
                            onChange={handleMing}
                        />
                        {ming &&
                            <Form.Group controlId='mimages'>
                                <Form.File
                                    id='mimage-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                            </Form.Group>
                        }
                            {ming && (inputimgList.map((x, i) => {

                                    return <div key={i}>
                                <Form.Group controlId='images'>
                                    <input

                                        name="images"
                                        placeholder="Image"
                                        value={x['images']}
                                        onChange={(e) => handleimgInputChange(e, i)}
                                    />

                                    {uploading && <Loader />}
                                    <div className="btn-box">
                                        {inputimgList.length !== 1 && (
                                            <button className="mr10" onClick={() => handleimgRemoveClick(i)}>X</button>
                                        )}
                                                    {/* {inputimgList.length - 1 === i && (
                                    <button onClick={handleimgAddClick}>+</button>
                                    )} */}
                                    </div>
                                </Form.Group>

                            </div>


                        }))}
                        {console.log(inputimgList)}
                        <Form.Group controlId='livep'>
                            <Form.Label>live Product</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter livep url'
                                value={livep}
                                onChange={(e) => setLivep(e.target.value)}
                            ></Form.Control>

                        </Form.Group>
                        <Form.Group controlId='youtubeId'>
                            <Form.Label>Video url</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Youtube url'
                                value={youtubeId.replace('https://www.youtube.com/watch?v=', '')}
                                onChange={(e) => setYoutubeId(e.target.value)}
                            ></Form.Control>

                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <label
                            htmlFor="inputVacationPercentage"
                            className="switch switch-default"
                        >
                            isCollection{" "}
                        </label>
                        <input
                            id="inputVacationPercentage"
                            type="checkbox"
                            checked={checked}
                            onChange={handleChange}
                        />
                        {checked && (
                            <div className="box">


                                <label
                                    htmlFor="inputVacationPercentage"
                                    className="switch switch-default"
                                >
                                    Add variants{" "}
                                </label>
                                <input
                                    id="inputVacationPercentage"
                                    type="checkbox"
                                    checked={canda}
                                    onChange={() => setCanda(!canda)}
                                />


                                {inputList.map((x, i) => {
                                    return (
                                        <div key={i}>
                                            { canda &&
                                                <div>
                                                    <input
                                                        name="name"
                                                        placeholder="Product Variant Name"
                                                        value={x.name}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                    />
                                                    <br />
                                                    <input
                                                        className="ml10"
                                                        type='number'
                                                        name="price"
                                                        placeholder="Price"
                                                        value={x.price}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                    />
                                                    <br/>
                                                

<label
                            htmlFor="ming"
                            className="switch switch-default"
                        >
                            Ming
                </label>
                        <input
                            id="ming"
                            type="checkbox"
                            checked={ming}
                            onChange={handleMing}
                        />
                        {ming &&
                            <Form.Group controlId='mimages'>
                                <Form.File
                                    id='mimage-file'
                                    label='Choose File'
                                    custom
                                    onChange={(e)=>uploadFileHandler(e,i)}
                                ></Form.File>
                            </Form.Group>
                        }
                            {ming && (x['image'].map((z, l) => {

                                    return <div key={l}>
                                <Form.Group controlId='images'>
                                    <input

                                        name="images"
                                        placeholder="Image"
                                        value={z['images']}
                                        onChange={(e) => handleVaraintInputImgChange(e, i ,l)}
                                    />

                                    {uploading && <Loader />}
                                    <div className="btn-box">
                                        {x['image'].length !== 1 && (
                                            <button className="mr10" onClick={() => handleRemoveVariantImgClick(i,l)}>X</button>
                                        )}
                                                    {/* {inputimgList.length - 1 === i && (
                                    <button onClick={handleimgAddClick}>+</button>
                                    )} */}
                                    </div>
                                </Form.Group>

                            </div>


                        }))}
                                                    <Form.Group controlId='livep'>
                                                        <input

                                                            name="livep"
                                                            placeholder="Live Product"
                                                            value={x.livep}
                                                            onChange={(e) => handleInputChange(e, i)}
                                                        />


                                                    </Form.Group>
                                                    <input
                                                        type='number'
                                                        name="qty"
                                                        placeholder="Qty in stock"
                                                        value={x.qty}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                    />
                                                    <div className="var">


                                                        <label
                                                            htmlFor="vartanda"
                                                            className="switch switch-default"
                                                        >
                                                            Add variant Types{" "}
                                                        </label>
                                                        <input
                                                            id="vartanda"
                                                            type="checkbox"
                                                            checked={vartanda}
                                                            onChange={setVartanda}
                                                        />



                                                        {vartanda && x['variants'].map((y, k) => {
                                                            return (
                                                                <div key={k}>
                                                                    { vartanda &&
                                                                    
                                                                        <div>
                                                                            <input
                                                                                name="value"
                                                                                placeholder="Product Variant value"
                                                                                value={y.value}
                                                                                onChange={(e) => handleVaraintInputChange(e,i, k)}
                                                                            
                                                                            />
                                                                            <input
                                                                                name="type"
                                                                                placeholder="Product Variant Name"
                                                                                value={y.type}
                                                                                onChange={(e) => handleVaraintInputChange(e, i,k)}
                                                                             
                                                                            />
                                                                                {["color","colour","Color","Colour","COLOR","COLOUR"].includes(y.type) && <>      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height  ?? 0)
            // width: Math.round(completedCrop?.width ?? 0),
            // height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>
      <p>
        Note that the download below won't work in this sandbox due to the
        iframe missing 'allow-downloads'. It's just for your reference.
      </p>
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop,i,k)
        }
      >
        Download cropped image
      </button></>}
                                                                        </div>}
                                                                    <div className="btn-box">
                                                                        {x['variants'].length !== 1 && (
                                                                            <button className="mr10" onClick={() => handleRemoveVariantClick(i,k)}>X</button>
                                                                        )}
                                                                        {x['variants'].length - 1 === k && (
                                                                            <button onClick={()=>handleAddVariantClick(i)}>+</button>
                                                                        )}
                                                                    </div>
                                                                </div>)
                                                        })}
                                                    </div>
                                                </div>}

                                            <div className="btn-box">
                                                {inputList.length !== 1 && (
                                                    <button className="mr10" onClick={() => handleRemoveClick(i)}>X</button>
                                                )}
                                                {inputList.length - 1 === i && (
                                                    <button onClick={handleAddClick}>+</button>
                                                )}
                                            </div>

                                        </div>
                                    );
                                })}
                                <div className="images-map-content">
                                    <label
                                        htmlFor="inputVacationPercentage"
                                        className="switch switch-default"
                                    >
                                        makeFinal{" "}
                                    </label>
                                    <input
                                        id="inputVacationPercentage"
                                        type="checkbox"
                                        checked={final}
                                        onChange={makeFinal}
                                    />
                                </div>

                            </div>
                        )}
                        <div style={{ marginTop: 20 }}>{JSON.stringify(sProducts)}</div>
                        <div style={{ marginTop: 20 }}>{JSON.stringify(variantList)}</div>

                        <div>{count}

                        </div>
                        <div>isCollection : {checked ? "true" : "false"}

                        </div>
                        <Button type='submit' variant='primary'>
                            {(name === 'Sample name') ? 'Create' : 'Update'}

                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductVariantEditScreen
