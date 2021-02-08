import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
    POST_CREATE_RESET,
    POST_CREATE_FAIL,
    POST_CREATE_SUCCESS,
    POST_CREATE_REQUEST,
    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,
    POST_CREATE_REVIEW_REQUEST,
    POST_CREATE_REVIEW_SUCCESS,
    POST_CREATE_REVIEW_FAIL,
    POST_CREATE_REVIEW_RESET,
    POST_TOP_REQUEST,
    POST_TOP_SUCCESS,
    POST_TOP_FAIL,
  } from '../constants/postConstants'
  
  export const postListReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
      case POST_LIST_REQUEST:
        return { loading: true, posts: [] }
      case POST_LIST_SUCCESS:
        return {
          loading: false,
          posts: action.payload.posts,
          pages: action.payload.pages,
          // page: action.payload.page,
        }
      case POST_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const postDetailsReducer = (
    state = { post: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case POST_DETAILS_REQUEST:
        return { loading: true, ...state }
      case POST_DETAILS_SUCCESS:
        return { loading: false, post: action.payload }
      case POST_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_DELETE_REQUEST:
        return { loading: true }
      case POST_DELETE_SUCCESS:
        return { loading: false, success: true }
      case POST_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CREATE_REQUEST:
        return { loading: true }
      case POST_CREATE_SUCCESS:
        return { loading: false, success: true, post: action.payload }
      case POST_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case POST_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const postUpdateReducer = (state = { post: {} }, action) => {
    switch (action.type) {
      case POST_UPDATE_REQUEST:
        return { loading: true }
      case POST_UPDATE_SUCCESS:
        return { loading: false, success: true, post: action.payload }
      case POST_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case POST_UPDATE_RESET:
        return { post: {} }
      default:
        return state
    }
  }
  
  export const postReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case POST_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case POST_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case POST_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const postTopRatedReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
      case POST_TOP_REQUEST:
        return { loading: true, posts: [] }
      case POST_TOP_SUCCESS:
        return { loading: false, posts: action.payload }
      case POST_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  