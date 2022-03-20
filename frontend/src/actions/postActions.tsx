import axios from 'axios'
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_USER_LIST_REQUEST,
  POST_USER_LIST_SUCCESS,
  POST_USER_LIST_FAIL,
  POST_USER_DETAILS_REQUEST,
  POST_USER_DETAILS_SUCCESS,
  POST_USER_DETAILS_FAIL,
  POST_DELETE_SUCCESS,
  POST_DELETE_REQUEST,
  POST_DELETE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_ALL_USER_DETAILS_SUCCESS,
  POST_ALL_USER_DETAILS_FAIL,
  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
  POST_TOP_REQUEST,
  POST_TOP_SUCCESS,
  POST_TOP_FAIL,
  POST_UPDATE_LIKES,
  POST_ERROR
} from '../constants/postConstants'
// , pageNumber = ''
export const listPosts = (keyword = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/posts?keyword=${keyword}&pageNumber=${1}`
    )
        console.log(data)
    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const listPostDetails = (id:string) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/posts/${id}`)
    console.log(data)

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUserPosts = (keyword = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: POST_USER_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/posts/user/?keyword=${keyword}&pageNumber=${1}`
    )

        console.log(data)
    dispatch({
      type: POST_USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUserPostDetails = (uid:string) => async (dispatch) => {
  try {
    dispatch({ type: POST_USER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/blogs/?uid=${uid}`)
    
  //  console.log(await axios.get(`/api/blogs/?uid=6030bdf61f6b361344f98d8d`))
  //  console.log(await axios.get(`/api/blogs/?uid=${uid}`))

   console.log(data)
   
  
    dispatch({
      type: POST_USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAllUserPostDetails = (uid:string) => async (dispatch) => {
  try {
    dispatch({ type: POST_USER_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/blogs/all/?uid=${uid}`)
    
  //  console.log(await axios.get(`/api/blogs/?uid=6030bdf61f6b361344f98d8d`))
  //  console.log(await axios.get(`/api/blogs/?uid=${uid}`))

   console.log(data)
   
  
    dispatch({
      type: POST_ALL_USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_ALL_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePost = (id:string) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/posts/${id}`, config)

    dispatch({
      type: POST_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }) }}
export const createPost = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
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
    const { data } =(userInfo.isSeller)? await axios.post(`/api/seller/posts`, {}, config) : await axios.post(`/api/posts`, {}, config)
    console.log(data)
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = (post,toSave:boolean) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST,
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
    // = (toSave)? `/api/posts/${post._id}/save` :  `/api/posts/${post._id}`
    const acurrString = (toSave)?  `/api/posts/${post._id}/save` :  `/api/posts/${post._id}`
    const scurrString = (toSave)?  `/api/seller/posts/${post._id}/save` :  `/api/seller/posts/${post._id}`
    currString= (userInfo.isSeller)? scurrString : acurrString
    const { data } = await axios.put(
      currString,
      post,
      config
    )
    console.log(data)

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPostReview = (postId:string, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POST_CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/posts/${postId}/reviews`, review, config)

    dispatch({
      type: POST_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POST_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTopPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_TOP_REQUEST })

    const { data } = await axios.get(`/api/posts/top`)

    dispatch({
      type: POST_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);
    dispatch({
      type: POST_UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);
    console.log(res)
    dispatch({
      type: POST_UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    console.log('error here')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};