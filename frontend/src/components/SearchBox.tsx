import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ReactSearchAutocomplete } from "./search/index";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const [search, setSearch] = useState("");
  const [previewSearches, setPreviewSearches] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const onLoadSearches = async value => {
    try {
      setRequestCount(requestCount + 1);
      const res = await axios.get(
        `/api/products?keyword=${value}`
      )
  
      console.log(value)
      console.log(res)
      const cities = res.data.products;
      console.log(cities)
      setPreviewSearches(cities);
    } catch {
      setPreviewSearches([]);
    }
  };
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

  // const productList = useSelector((state) => state.productList)
  // const {products} = productList
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
       {/* <input
        type="text"
        placeholder="Search any Country ..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          onLoadSearches(e.target.value);
        }}
      />
      {previewSearches.length > 0 && (
        <ul>
          {previewSearches.map((city, i) => {
            return <li key={i}>{city.name}</li>;
          })}
        </ul>
      )} */}
      <ReactSearchAutocomplete
      items={previewSearches}
      onSearch={onLoadSearches}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      styling={{ zIndex: 25 }} // To display it on top of the search box below
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
    {/* <div > */}
      <Button type='submit' variant='outline-success' className='p-2' style={{borderRadius:"50%"}}>

      <i className="fas fa-search fa-2x"></i>
      </Button>
      {/* </div> */}
    </Form>
  )
}

export default SearchBox
