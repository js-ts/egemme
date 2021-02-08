import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ReactSearchAutocomplete } from "./search/index";
import SearchIcon from '@material-ui/icons/Search';
const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  const handleOnSearch = (string, results) => {
      console.log(string);
      setKeyword(string)
  };

  const productList = useSelector((state) => state.productList)
  const {products} = productList
  const handleOnSelect = (item) => {
    history.push(`/search/${item.name}`)
    console.log(item.name)
                                       };
  const handleOnFocus = () => {
    console.log("Focused");
  };


  return (
    <Form onSubmit={submitHandler} inline>
       <div style={{ width: "40vw", margin: 0 }}>
      <ReactSearchAutocomplete
      items={products}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      styling={{ zIndex: 1 }} // To display it on top of the search box below
      autoFocus
    />
    </div>
      {/* <div style={{  margin: -250 }}> *
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      >
         
      </Form.Control> 
       </div> */}
    {/* <div style={{  margin: 50 }}> */}
      <Button type='submit' variant='outline-success' className='p-2'>

      <i className="fas fa-search fa-2x"></i>
      </Button>
      {/* </div> */}
    </Form>
  )
}

export default SearchBox
