import axios from 'axios'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editor/constants";
import ReactCrop from 'react-image-crop';
import { Grid } from "@material-ui/core";
import './vw.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listLinkDetails, updateLink } from '../actions/linkActions'
import { LINK_UPDATE_RESET } from '../constants/linkConstants'
import { IconPicker } from "react-fa-icon-picker";
const LinkEditScreen = ({ match, history }) => {
  const linkId = match.params.id
  const [readOnly, setreadOnly] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [linksplus, setLinksPlus] = useState(false)
  const [active, setActive] = useState(false)
  const [theme, settheme] = useState(0)
  const [level, setLevel] = useState(1)
  const [leveled, setLeveled] = useState(false)
  // const [image, setimage] = useState(initialState)
  const [isDefault, setisDefault] = useState(false)
  const [inputList, setInputList] = useState([{
    linktitle: "", link: "", thumbnail: "", data: {
      time: new Date().getTime()
      ,
      blocks: [
        {
          type: "header",
          data: {
            text: "",
            level: 2
          }
        },
        {
          type: "paragraph",
          data: {
            text:
              ""
          }
        }
      ],
      version: "2.12.4"
    }
  }]);
  const [varanda, setVaranda] = useState(false)
  const [vartanda, setVartanda] = useState(false)
  const [cropper, setCropper] = useState(false)
  const [variantList, setVariantList] = useState([{ value: "", type: "" }]);
  const [urla, setUrla] = useState([])
  const instanceRef = React.useRef([]);
  const dispatch = useDispatch()
  const [upImg, setUpImg] = useState();
  const linkDetails = useSelector((state) => state.linkDetails)
  const { loading, error, link } = linkDetails
  const imgRef = useRef(null);
  const linkUpdate = useSelector((state) => state.linkUpdate)
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = linkUpdate

  let count = 0;
  const [data, setData] = useState(link)
  // const [pubSave, setPubSave] = useState(link.data.time)

  const isOne = (count === 1) ? true : false;
  const isdef = (link) ? true : false
  const [inputimgList, setInputimgList] = useState([{ images: "" }]);
  const [image, setImage] = useState(inputimgList)
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const generateDownload = (canvas, crop, index, subindex) => {
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
    list[index]['variants'][subindex]['type'] = list[index]['variants'][subindex]['type'] + `,${crop.x * scaleX},${crop.y * scaleY},${crop.width * scaleX},${crop.height * scaleY},0,0,50,50`;
    setInputList(list);
    console.log(`${crop.x * scaleX},${crop.y * scaleY},${crop.width * scaleX},${crop.height * scaleY},0,0,50,50`)

    // console.log(canvas.toDataURL("image/jpeg",1))
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };



  const uploadFileHandler = async (e, i = 786) => {
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
      if (i !== 786) {
        handleAddVariantImgClick(data, i,'thumb:')
        setUploading(false)

      }
      handleimgAddClick(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  // handle input change
  const handleInputChange = (e, index) => {

    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleEditorChange = (data, index) => {
    const list = [...inputList];
    list[index]['data'] = data;
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
    setInputList([...inputList, {
      linktitle: "", link: "", thumbnail: "", data: {
        time: new Date().getTime()
        ,
        blocks: [
          {
            type: "header",
            data: {
              text: "",
              level: 2
            }
          },
          {
            type: "paragraph",
            data: {
              text:
                ""
            }
          }
        ],
        version: "2.12.4"
      }
    }]);
  };
  //variant input list
  const handleRemoveVariantClick = (index, subindex) => {
    const list = [...inputList];
    list[index]['variants'].splice(subindex, 1);
    setInputList(list);
  };
  const handleVaraintInputChange = (e, index, subindex) => {
    const { name, value } = e.target;
    if (["color", "colour", "Color", "Colour", "COLOR", "COLOUR"].includes(value) && name === "type") {
      console.log(["color", "colour", "Color", "Colour", "COLOR", "COLOUR"].includes(value) && name === "type")
      setCropper(true)

    }
    const list = [...inputList];
    list[index]['variants'][subindex][name] = value;
    setInputList(list);
  };

  const handleAddVariantClick = (index) => {
    console.log(index)
    const list = [...inputList];
    list[index]['variants'] = [...list[index]['variants'], { value: "", type: "" }];
    setInputList(list);
    // setVariantList([...variantList, { value: "", type: "" }])
  }
  //
  const handleRemoveVariantImgClick = (index, subindex) => {
    const list = [...inputList];
    list[index]['image'].splice(subindex, 1);
    setInputList(list);
  };
  const handleVaraintInputImgChange = (e, index, subindex) => {

    const { name, value } = e.target;
    const list = [...inputList];
    list[index]['image'][subindex][name] = value;
    setInputList(list);
  };

  const handleAddVariantImgClick = (data, index,type) => {
    console.log(index)
    const list = [...inputList];
    list[index]['thumbnail'] = type+data;
    // [...list[index]['image'], { images: data }]
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
  count = checked ? inputList.length : 0
  const handleChange = () => {
    setChecked(!checked);

  };
  const [ming, setMing] = useState(false);
  const handleMing = () => {
    setMing(!ming);

  };
  const iscollection = checked;
  // if(isdef){  console.log(link.data.time>link.saved.time)
  //   console.log(data)}
  console.log(data)
  // console.log(pubSave)
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: LINK_UPDATE_RESET })
      history.push('/admin/linklist')
    } else {
      if (!link.data || link._id !== linkId) {
        if (isOne) {

          dispatch(listLinkDetails(linkId))
          count++;
        }

      } else {
        if (link.isPublished) {
          setData(link.data)
        }
        else {
          setData(link.save)
        }
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

  }, [dispatch, match, history, linkId, link, successUpdate])


  async function submitHandler(e) {
    const data = await instanceRef.current.save();
    console.log(data)
    e.preventDefault()
    dispatch(
      updateLink({
        _id: linkId,
        theme: theme,
        isDefault: isDefault,
        image: "",
        links: [...inputList]

      }, false)
    )
  }

  async function saveSubmitHandler(e, i) {
    const data = await instanceRef.current[i].save();
    console.log(i)
    //  if(inputList[i]['data']['time']===data['time']){

    handleEditorChange(data, i)
    // }

    console.log(data)
    // e.preventDefault()
    // dispatch(
    //   updateLink({
    //     _id: linkId,
    //     data

    //   }, true)
    // )
  }
  const customCommand = {
    name: "my-custom-command",
    icon: () => (
      <span role="img" aria-label="nice"></span>),
  };
  async function handleSave() {
    const savedData = await instanceRef.current.save();
    console.log("savedData", savedData);
  }





  { link && delete link._id }
  { console.log(link) }
  return (
    <>

      <Link to='/admin/linklist' className='btn btn-light my-3'>
        <i className="fas fa-long-arrow-alt-left fa-5x"></i>
      </Link>

      <>
        {link.isPublished ? <h1>Edit Link</h1> : <h1>Create Link</h1>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (

          <>

            <Form onSubmit={submitHandler}>

              {isdef ? (
                <>

                  <Form.Group controlId='price'>
                    <Form.Label>theme no</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      value={theme}
                      onChange={(e) => settheme(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <label
                    htmlFor="def"
                    className="switch switch-default"
                  >
                    Default
                </label>
                  <input
                    id="def"
                    type="checkbox"
                    checked={isDefault}
                    onChange={() => setisDefault(!isDefault)}
                  />

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
                  {/* {ming && (inputimgList.map((x, i) => {

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
                           
                          </div>
                        </Form.Group>

                      </div>


                    }))} */}
                  {/* {inputimgList.length - 1 === i && (
                                    <button onClick={handleimgAddClick}>+</button>
                                    )} */}
                  {console.log(inputimgList)}



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


                      {checked && inputList.map((x, i) => {
                        return (
                          <div key={i}>
                            { canda &&
                              <div>
                                <input
                                  name="linktitle"
                                  placeholder="Link Title"
                                  value={x.linktitle}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                                <br />
                                <input
                                  name="link"
                                  placeholder="Link"
                                  value={x.link}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                                <br />


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
                                      onChange={(e) => uploadFileHandler(e, i)}
                                    ></Form.File>
                                  </Form.Group>
                                }
                                {!ming &&
                                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p>

                                      Add icons
                                       </p>
                                    <IconPicker value={x.thumbnail} onChange={(value) =>handleAddVariantImgClick(value, i,'icon:')} />
                                  </div>

                                }
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <label
                                  htmlFor="full"
                                  className="switch switch-default"
                                >
                                    Full
                                      </label>
                                                        <input
                                  id="full"
                                  type="checkbox"
                                  checked={active}
                                  onChange={()=>{setActive(!active)}}
                                />
                                 <label
                                  htmlFor="ming"
                                  className="switch switch-default"
                                >
                                      Expansionary
                                      </label>
                                                        <input
                                  id="expansionary"
                                  type="checkbox"
                                  checked={!active}
                                  onChange={()=>{setActive(!active)}}
                                />
                                 <label
                                  htmlFor="ming"
                                  className="switch switch-default"
                                >
                                      Leveled
                                      </label>
                                                        <input
                                  id="leveled"
                                  type="checkbox"
                                  checked={leveled}
                                  onChange={()=>{setLeveled(!leveled)}}
                                />
                                  </div>
                                 
{leveled &&  <Form.Group controlId='level'>
                    <Form.Label>theme no</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter level'
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    ></Form.Control>
                  </Form.Group>}
                                {/* {ming && (x['image'].map((z, l) => {

                                    return <div key={l}>
                                      <Form.Group controlId='images'>
                                        <input

                                          name="images"
                                          placeholder="Image"
                                          value={z['images']}
                                          onChange={(e) => handleVaraintInputImgChange(e, i, l)}
                                        />

                                        {uploading && <Loader />}
                                        <div className="btn-box">
                                          {x['image'].length !== 1 && (
                                            <button className="mr10" onClick={() => handleRemoveVariantImgClick(i, l)}>X</button>
                                          )}
                                                  
                                        </div>
                                      </Form.Group>

                                    </div>


                                  }))} */}

                                {/* {inputimgList.length - 1 === i && (
                                              <button onClick={handleimgAddClick}>+</button>
                                              )} */}
                                {/* <Form.Group controlId='livep'>
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
                                  /> */}




                                <EditorJs
                                  tools={EDITOR_JS_TOOLS}
                                  data={x.data}
                                  minHeight={0}
                                  instanceRef={instance => (instanceRef.current[i] = instance)}
                                  onChange={(e) => saveSubmitHandler(data, i)}

                                  i18n={{
                                    messages: {}
                                  }}
                                />

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
                  <p>{JSON.stringify(inputList)}</p>


                  {/* <Button onClick={saveSubmitHandler}>Save Link</Button> */}

                  {/* </Form.Group> */}
                </>

              ) : (
                <Loader />
              )}


              <Button type='submit' variant='primary'>
                Publish
            </Button>
            </Form>






          </>
        )
        }

      </>


    </>

  )
}

export default LinkEditScreen
