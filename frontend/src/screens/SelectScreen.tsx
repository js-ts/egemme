import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import React,{useState} from 'react'
import {catsub} from './catsubclean'
const SelectScreen=()=>{
    const [rating, setRating] = useState('')
    const [n2, setN2] = useState('')
    const [n3, setN3] = useState('')
    const [n4, setN4] = useState('')
    const [n5, setN5] = useState('')
    const [n6, setN6] = useState('')
    const [n7, setN7] = useState('')




    // let SubCat1 = (rating!=='')? catsub.filter(x=>x.Cat1==="Animals & Pet Supplies") : ''
    // const SubCat1 = catsub.filter(x=>x.Cat1==="Animals & Pet Supplies")
    const SubCat2=rating!=='' && catsub.filter(x=>x.Cat1===rating)
    const ASubCat2=typeof SubCat2 ==='object' && SubCat2.map((obj)=> {return obj.Cat2}).filter(y=>y!==undefined)
    const Cat2=typeof ASubCat2 ==='object' && [...new Set(ASubCat2)]
    
    const SubCat3=n2!=='' &&typeof SubCat2 ==='object' && SubCat2.filter(x1=>x1.Cat2===n2)
    const ASubCat3=typeof SubCat3 ==='object' && SubCat3.map((obj)=> {return obj.Cat3}).filter(y=>y!==undefined)
    const Cat3=typeof ASubCat3 ==='object' && [...new Set(ASubCat3)]
    
    const SubCat4=n3!=='' &&typeof SubCat3 ==='object' && SubCat3.filter(x2=>x2.Cat3===n3)
    const ASubCat4=typeof SubCat4 ==='object' && SubCat4.map((obj)=> {return obj.Cat4}).filter(z=>z!==undefined)
    const Cat4=typeof ASubCat4 ==='object' && [...new Set(ASubCat4)]
    
    const SubCat5=n4!=='' &&typeof SubCat4 ==='object' && SubCat4.filter(x3=>x3.Cat4===n4)
    const ASubCat5=typeof SubCat5 ==='object' && SubCat5.map((obj)=> {return obj.Cat5}).filter(za=>za!==undefined)
    const Cat5=typeof ASubCat5 ==='object' && [...new Set(ASubCat5)]
    
    const SubCat6=n5!=='' &&typeof SubCat5 ==='object' && SubCat5.filter(x3=>x3.Cat5===n5)
    const ASubCat6=typeof SubCat6 ==='object' && SubCat6.map((obj)=> {return obj.Cat6}).filter(zb=>zb!==undefined)
    const Cat6=typeof ASubCat6 ==='object' && [...new Set(ASubCat6)]

    const SubCat7=n6!=='' &&typeof SubCat6 ==='object' && SubCat6.filter(x3=>x3.Cat6===n6)
    const ASubCat7=typeof SubCat7 ==='object' && SubCat7.map((obj)=> {return obj.Cat7}).filter(zb=>zb!==undefined)
    const Cat7=typeof ASubCat7 ==='object' && [...new Set(ASubCat7)]


    console.log(Cat2)
    console.log(Cat3)
    console.log(Cat4)
    console.log(Cat5)
    console.log(Cat6)
    console.log(Cat7)



    const Cat1 = ["","Animals & Pet Supplies"
    ,
    "Apparel & Accessories"
    ,
    "Arts & Entertainment"
    ,
    "Baby & Toddler"
    ,
    "Business & Industrial"
    ,
    "Cameras & Optics"
    ,
    "Electronics"
    ,
    "Food, Beverages & Tobacco"
    ,
    "Furniture"
    ,
    "Hardware"
    ,
    "Health & Beauty"
    ,
    "Home & Garden"
    ,
    "Luggage & Bags"
    ,
    "Mature"
    ,
    "Media"
    ,
    "Office Supplies"
    ,
    "Religious & Ceremonial"
    ,
    "Software"
    ,
    "Sporting Goods"
    ,
    "Toys & Games"
    ,
    "Vehicles & Parts"
    ]
return (<>
{rating!=='' && console.log(SubCat2)}
<Form>

<Form.Control
as='select'
value={rating}
onChange={(e) => setRating(e.target.value)}
>
{Cat1.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>
{rating!=='' && 
<Form.Control
as='select'
value={n2}
onChange={(e) => setN2(e.target.value)}
>
{typeof ASubCat2 ==='object' && Cat2.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>}
{n2!=='' && 
<Form.Control
as='select'
value={n3}
onChange={(e) => setN3(e.target.value)}
>
{typeof ASubCat3 ==='object' && Cat3.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>}
{n3!=='' && 
<Form.Control
as='select'
value={n4}
onChange={(e) => setN4(e.target.value)}
>
{typeof ASubCat4 ==='object' && Cat4.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>}
{n4!=='' && 
<Form.Control
as='select'
value={n5}
onChange={(e) => setN5(e.target.value)}
>
{typeof ASubCat5 ==='object' && Cat5.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>}
{n5!=='' && 
<Form.Control
as='select'
value={n6}
onChange={(e) => setN6(e.target.value)}
>
{typeof ASubCat6 ==='object' && Cat6.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>}
{n6!=='' && 
<Form.Control
as='select'
value={n7}
onChange={(e) => setN7(e.target.value)}
>
{typeof ASubCat7 ==='object' && Cat7.map(
                              (x,i) => (
                                <option key={i} value={x}>
                                  {x}
                                </option>
                              )
                            )}
</Form.Control>}
</Form>

</>)
}

export default SelectScreen