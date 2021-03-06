import axios from 'axios'
import React, { useState, useEffect } from 'react'
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

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)


  const [livep, setLivep] = useState('')
  const [youtubeId, setYoutubeId] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [inputList, setInputList] = useState([{ x: "", y: "", name: "", price: "", image: "", livep: "", brand: "", qty: "", category: "", description: "", url: "" }]);
  const [urla, setUrla] = useState([])
  const [isUrla, ChangeUrla] = useState(false)
  const [currImg,setcurrImg]= useState('')
  const dispatch = useDispatch()
  // const dispatche=useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails;
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  console.log(products)
  console.log(product.image)
  const [inputimgList, setInputimgList] = useState([{ images: "" }]);
  console.log(inputimgList)
  const [image, setImage] = useState(inputimgList)
  console.log(image)
  const handleOnSearch = (string, results) => {
    console.log(string);

  };
  const handleOnSelect = (item) => {
    // history.push(`/search/${item.name}`)
    console.log(item)
    setUrla([...urla, item])
  };
  const handleOnFocus = () => {
    console.log("Focused");
  };

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  interface AreaType extends Area {
    href?: string;
  }

  const EXAMPLE_AREA: AreaType[] = [

  ];

  const CROP: ReactCrop.Crop = {
    unit: '%',
    x: 0,
    y: 20,
    height: 12,
    width: 18
  };

  const formatMapArea = (mapArea: any): AreaType[] => {
    return mapArea.map((area: AreaType & { [k: string]: string }) => {
      let result: any = {};
      Object.keys(area).forEach((key: string) => {
        result[key] = key !== 'href' ? `${parseFloat(area[key])}%` : area[key];
      });
      return result;
    });
  };

  // JSON????????????
  const trycatchHandle = (jsonStr: string) => {
    let result = [];
    try {
      result = JSON.parse(jsonStr);
    } catch (err) {
      console.log(err);
    }
    return result;
  };
  const { imgSrc, postmessage } = getUrlParams();
  // const [img, setImg] = useState(image);

  const [img, setImg] = useState<string>(imgSrc || EXAMPLE);

  const [mapArea, setMapArea] = useState<AreaType[]>(EXAMPLE_AREA);
  const [crop, setCrop] = useState<ReactCrop.Crop>(CROP);
  const [mapAreaString, setMapAreaString] = useState<string>(
    JSON.stringify(formatMapArea(mapArea))
  );
  console.log(mapAreaString)

  const [mapAreaFormatString, setMapAreaFormatString] = useState<string>(
    JSON.stringify(formatMapArea(mapArea), null, 4)
  );

  postmessage &&
    window.addEventListener(
      'message',
      (event: any) => {
        console.log(event);
        const { data } = event;
        if (!data) return;
        const mapAreaData = trycatchHandle(data);
        setMapArea(mapAreaData);
        setMapAreaString(JSON.stringify(formatMapArea(mapAreaData)));
        setMapAreaFormatString(JSON.stringify(formatMapArea(mapAreaData), null, 4));
      },
      false
    );



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
    setInputList([...inputList, { x: "", y: "", name: "", price: "", image: "", livep: "", brand: "", qty: "", category: "", description: "", url: "" }]);

  };



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

    const cropBoxEle: HTMLElement | null = document.querySelector('.ReactCrop');
    const handle = (e: any) => {
      const cropEle: HTMLElement | null = document.querySelector('.ReactCrop__crop-selection');

      if (e.target === cropEle) {
        addSubArea('add')();
      }
    };
    if (cropBoxEle) {
      cropBoxEle.addEventListener('dblclick', handle);
      return () => cropBoxEle.removeEventListener('dblclick', handle);
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
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



  }, [dispatch, history, productId, product, urla, successUpdate])

  const addUrla = (addl) => {
    dispatch(listProductDetails(addl))

    if (addl === product._id) {
      setUrla([...urla, product])
    }
  }


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader: FileReader = new FileReader();
      reader.addEventListener('load', () => {
        setImg(reader.result as string);
        setMapArea([]);
        setCrop(CROP);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const setMap = (type: string, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const mapAreaNew = mapArea.map((map: any, idx: number) =>
      index === idx ? { ...map, [type]: value } : map
    );
    setMapArea(mapAreaNew);
    setMapAreaString(JSON.stringify(formatMapArea(mapAreaNew)));
    setMapAreaFormatString(JSON.stringify(formatMapArea(mapAreaNew), null, 4));
  };

  const addSubArea = (type: string, index: number = 0) => () => {
    let newArea = {},
      mapAreaNew: any = [];
    // mapAreaNew.length=count
    if (type === 'add') {
      const { x, y, width, height } = crop;
      newArea = {
        width: 6,
        height: 6,
        left: x,
        top: y,

      };
      console.log(newArea)

      // .slice(0,count);

      mapAreaNew = [...mapArea, newArea].slice(0, count);
      console.log(mapAreaNew)

    } else {
      mapArea.splice(index, 1);
      mapAreaNew = [...mapArea];
    }
    setMapArea(mapAreaNew);
    setMapAreaString(JSON.stringify(formatMapArea(mapAreaNew)));
    setMapAreaFormatString(JSON.stringify(formatMapArea(mapAreaNew), null, 4));
    // message.success('success');


  };

  const onCropChange = (crop: any, percentCrop: any) => {
    setCrop(percentCrop);
  };

  const onMapClick = (area: AreaType, index: number) => {
    const tip = `click map ${area.href || index + 1}`;
    console.log(tip, area);
    // message.info(tip);
  };

  const toSetMap = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    let result = [];
    try {
      result = JSON.parse(value);
      setMapArea(result);
      setMapAreaString(JSON.stringify(formatMapArea(result)));
      setMapAreaFormatString(JSON.stringify(formatMapArea(result), null, 4));
      // message.success('success');
    } catch (error) {
      console.log(error);
      // message.error(error);
    }
  };
 const ImageMapComponent = React.useMemo(
    () => (
      <ImageMap
        className="usage-map"
        src={currImg}
        map={formatMapArea(mapArea)}
        onMapClick={onMapClick}
      /> ),
    [mapArea, currImg]
  );
  const uploadFileHandler = async (e) => {
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
  console.log(mapArea)
  if (final && canda) {
    for (let i = 0; i < sProducts.length; i++) {
      sProducts[i].x = mapArea[i].left
      sProducts[i].y = mapArea[i].top
      sProducts[i].price = +sProducts[i].price
      sProducts[i].qty = +sProducts[i].qty


      console.log(sProducts)
    }
  }
  if (final && !canda) {
    for (let i = 0; i < sProducts.length; i++) {
      sProducts[i].x = mapArea[i].left
      sProducts[i].y = mapArea[i].top



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
    // if(checked){
    //   sProducts.map((sp)=>updateProduct({  
    //     _id: sp.productId,
    //     sp.name,
    //     sp.price,
    //     sp.iscollection,
    //     sp.image,
    //     sp.livep,
    //     sp.brand,
    //     sp.category,
    //     sp.description,
    //     sp.countInStock})
    //   )}
  }
  // console.log(listProductDetails(`5fff196b7e40de3160439ccc`))


  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        <i className="fas fa-long-arrow-alt-left fa-5x"></i>
      </Link>
      <FormContainer>
        {( product.isCreated) ? <h1>Create Product</h1> : <h1>Edit Product</h1>}
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
                {ming &&  (inputimgList.map((x, i) => {
              
return  <div key={i}>
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
                      Create and add{" "}
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
                                placeholder="Product Name"
                                value={x.name}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                className="ml10"
                                type='number'
                                name="price"
                                placeholder="Price"
                                value={x.price}
                                onChange={(e) => handleInputChange(e, i)}
                              />

                              <Form.Group controlId='image'>
                                <input

                                  name="image"
                                  placeholder="Image"
                                  value={x.image}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                                <Form.File
                                  id='image-file'
                                  label='Choose File'
                                  custom

                                ></Form.File>
                                {uploading && <Loader />}

                              </Form.Group>
                              <Form.Group controlId='livep'>
                                <input

                                  name="livep"
                                  placeholder="Live Product"
                                  value={x.livep}
                                  onChange={(e) => handleInputChange(e, i)}
                                />


                              </Form.Group>
                              <input

                                name="brand"
                                placeholder="Brand Name"
                                value={x.brand}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                type='number'
                                name="qty"
                                placeholder="Qty in stock"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input

                                name="category"
                                placeholder="Category"
                                value={x.category}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                              <input
                                name="description"
                                placeholder="Description"
                                value={x.description}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </div>}
                          { !canda &&
                            <div>
                              <div style={{ width: "50vw", margin: 0 }}>
                                <ReactSearchAutocomplete
                                  items={products}
                                  onSearch={handleOnSearch}
                                  onSelect={handleOnSelect}
                                  onFocus={handleOnFocus}
                                  styling={{ zIndex: 1 }} // To display it on top of the search box below
                                  autoFocus
                                />
                              </div>

                              <br />
                              {/* <Form.Group controlId='url'>
                                <Form.Label>Product Url</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Paste product Url and double-click  Add product to add it'
                                  value={x.url}
                                  onChange={(e) => handleInputChange(e, i)}
                                ></Form.Control>
                              </Form.Group> */}
                              <label
                                htmlFor="inputVacationPercentage"
                                className="switch switch-default"
                              >
                                Add url{" "}

                              </label>
                              <input
                                id="inputVacationPercentage"
                                type="checkbox"
                                checked={isUrla}
                                onChange={() => ChangeUrla(!isUrla)}
                              />


                              {isUrla && <div>
                                <Form.Label>Paste product Url and double-click  Add product to add it</Form.Label>
                                <input
                                  name="url"
                                  placeholder="Paste product Url"
                                  value={x.url}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                                <br />
                                <Button
                                  onClick={() => addUrla(inputList[i].url.split('/').slice(-1)[0])}


                                >
                                  Add product
                              </Button>
                              </div>}
                            </div>
                          }
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
                      <div className="crop-box">
                        <div className="map-box">
                          <div className="map-box-img">
                            <ReactCrop src={currImg} crop={crop} ruleOfThirds onChange={onCropChange} />
                            {currImg &&
                              mapArea.map((map: any, index: number) => (
                                <span
                                  className="crop-item"
                                  key={index}
                                  style={{
                                    width: `${parseFloat(map.width)}%`,
                                    height: `${parseFloat(map.height)}%`,
                                    left: `${parseFloat(map.left)}%`,
                                    top: `${parseFloat(map.top)}%`
                                  }}
                                />
                              ))}
                          </div>
                          <div className="map-box-img">{ImageMapComponent}</div>
                        </div>
                      </div>

                      {image[0]['images'] &&
                        mapArea.map((map: any, index: number) => {
                          return (
                            <div className="map-area" key={index}>
                              <label className="title">map{index + 1}</label>
                              <div className="setting-box">
                                {/* <div className="setting-box-item">
                  <label>width: </label>
                  <input
                    value={parseFloat(map.width)}
                    type="number"
                    onChange={setMap('width', index)}
                  />
                </div>
                <div className="setting-box-item">
                  <label>height: </label>
                  <input
                    value={parseFloat(map.height)}
                    type="number"
                    onChange={setMap('height', index)}
                  />
                </div> */}
                                <div className="setting-box-item">
                                  <label>left: </label>
                                  <input
                                    value={parseFloat(map.left)}
                                    type="number"
                                    onChange={setMap('left', index)}
                                  />
                                </div>
                                <div className="setting-box-item">
                                  <label>top: </label>
                                  <input
                                    value={parseFloat(map.top)}
                                    type="number"
                                    onChange={setMap('top', index)}
                                  />
                                </div>
                                {/* <div className="setting-box-item">
                  <label>href: </label>
                  <input value={map.href} type="text" onChange={setMap('href', index)} />
                </div> */}
                              </div>
                              <Button className="cad-iconfont icon-sub" onClick={addSubArea('sub', index)} >X</Button>
                            </div>
                          );
                        })}
                      <div className="opt-box">
                        <Button
                          className="opt-box-btn"
                          icon={<i className="cad-iconfont icon-dotted-box" />}
                          onClick={addSubArea('add')}
                        >
                          Add map
        </Button>
                        {/* <Button
        onClick={()=> console.log(dispatch(listProductDetails("http://localhost:3000/product/5fff196b7e40de3160439cce".split('/').slice(-1)[0])))}>
            get product
        </Button> */}
                        {/* <CopyToClipboard text={mapAreaString} onCopy={() => message.success('copy success')}>
          <Button className="opt-box-btn" icon={<i className="cad-iconfont icon-copy" />}>
            Copy
          </Button>
        </CopyToClipboard>
        <CopyToClipboard text={mapAreaFormatString} onCopy={() => message.success('copy success')}>
          <Button className="opt-box-btn" icon={<i className="cad-iconfont icon-copy" />}>
            Format copy
          </Button>
        </CopyToClipboard> */}
                        <Button className="opt-box-btn" icon={<i className="cad-iconfont icon-image" />}>
                          <input type="file" accept="image/*" className="picker-image" onChange={onChange} />
          Select images
        </Button>
                      </div>
                      <textarea cols={3} value={mapAreaString} onChange={toSetMap} />
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
                <div>{count}
                  {mapArea.length}
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

export default ProductEditScreen
