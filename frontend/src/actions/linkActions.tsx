import axios from 'axios'
import {
  LINK_LIST_REQUEST,
  LINK_LIST_SUCCESS,
  LINK_LIST_FAIL,
  LINK_DETAILS_REQUEST,
  LINK_DETAILS_SUCCESS,
  LINK_DETAILS_FAIL,
  LINK_USER_LIST_REQUEST,
  LINK_USER_LIST_SUCCESS,
  LINK_USER_LIST_FAIL,
  LINK_USER_DETAILS_REQUEST,
  LINK_USER_DETAILS_SUCCESS,
  LINK_USER_DETAILS_FAIL,
  LINK_DELETE_SUCCESS,
  LINK_DELETE_REQUEST,
  LINK_DELETE_FAIL,
  LINK_CREATE_REQUEST,
  LINK_CREATE_SUCCESS,
  LINK_CREATE_FAIL,
  LINK_UPDATE_REQUEST,
  LINK_UPDATE_SUCCESS,
  LINK_UPDATE_FAIL,
  LINK_ALL_USER_DETAILS_SUCCESS,
  LINK_ALL_USER_DETAILS_FAIL,
  LINK_CREATE_REVIEW_REQUEST,
  LINK_CREATE_REVIEW_SUCCESS,
  LINK_CREATE_REVIEW_FAIL,
  LINK_TOP_REQUEST,
  LINK_TOP_SUCCESS,
  LINK_TOP_FAIL,
  LINK_UPDATE_LIKES,
  LINK_ERROR
} from '../constants/linkConstants'
// , pageNumber = ''
export const listLinks = (keyword = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: LINK_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/links?keyword=${keyword}&pageNumber=${1}`
    )
        console.log(data)
    dispatch({
      type: LINK_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const listLinkDetails = (id:string) => async (dispatch) => {
  try {
    dispatch({ type: LINK_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/links/:username/:id`)
    console.log(data)

    dispatch({
      type: LINK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUserLinks = (keyword = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: LINK_USER_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/links/user/?keyword=${keyword}&pageNumber=${1}`
    )

        console.log(data)
    dispatch({
      type: LINK_USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUserLinkDetails = (uid:string) => async (dispatch) => {
  try {
    dispatch({ type: LINK_USER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/blogs/?uid=${uid}`)
    
  //  console.log(await axios.get(`/api/blogs/?uid=6030bdf61f6b361344f98d8d`))
  //  console.log(await axios.get(`/api/blogs/?uid=${uid}`))

   console.log(data)
   
  
    dispatch({
      type: LINK_USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAllUserLinkDetails = (uid:string) => async (dispatch) => {
  try {
    dispatch({ type: LINK_USER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/blogs/all/?uid=${uid}`)
    
  //  console.log(await axios.get(`/api/blogs/?uid=6030bdf61f6b361344f98d8d`))
  //  console.log(await axios.get(`/api/blogs/?uid=${uid}`))

   console.log(data)
   
  
    dispatch({
      type: LINK_ALL_USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_ALL_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteLink = (id:string) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LINK_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/links/${id}`, config)

    dispatch({
      type: LINK_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LINK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) }}
export const createLink = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LINK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    console.log(userInfo)
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    
    console.log(userInfo.isSeller)
    const { data } =await axios.post(`/api/links`, {}, config)
    console.log(data)
    dispatch({
      type: LINK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateLink = (link,toSave:boolean) => async (dispatch, getState) => {
  console.log(link)
  try {
    dispatch({
      type: LINK_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    let currString 
    // = (toSave)? `/api/links/${link._id}/save` :  `/api/links/${link._id}`
    const acurrString = (toSave)?  `/api/links/${link._id}/save` :  `/api/links/${link._id}`
    const scurrString = (toSave)?  `/api/seller/links/${link._id}/save` :  `/api/seller/links/${link._id}`
    currString= (userInfo.isSeller)? scurrString : acurrString
    const { data } = await axios.put(
      acurrString,
      link,
      config
    )
    console.log(data)

    dispatch({
      type: LINK_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createLinkReview = (linkId:string, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: LINK_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/links/${linkId}/reviews`, review, config)

    dispatch({
      type: LINK_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: LINK_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTopLinks = () => async (dispatch) => {
  try {
    dispatch({ type: LINK_TOP_REQUEST })

    const { data } = await axios.get(`/api/links/top`)

    dispatch({
      type: LINK_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LINK_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addLike = (linkId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/links/like/${linkId}`);
    dispatch({
      type: LINK_UPDATE_LIKES,
      payload: { linkId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: LINK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (linkId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/links/unlike/${linkId}`);
    console.log(res)
    dispatch({
      type: LINK_UPDATE_LIKES,
      payload: { linkId, likes: res.data },
    });
  } catch (err) {
    console.log('error here')
    dispatch({
      type: LINK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};