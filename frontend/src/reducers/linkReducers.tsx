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
    LINK_DELETE_REQUEST,
    LINK_DELETE_SUCCESS,
    LINK_DELETE_FAIL,
    LINK_CREATE_RESET,
    LINK_CREATE_FAIL,
    LINK_CREATE_SUCCESS,
    LINK_CREATE_REQUEST,
    LINK_UPDATE_REQUEST,
    LINK_UPDATE_SUCCESS,
    LINK_UPDATE_FAIL,
    LINK_UPDATE_RESET,
    LINK_CREATE_REVIEW_REQUEST,
    LINK_CREATE_REVIEW_SUCCESS,
    LINK_CREATE_REVIEW_FAIL,
    LINK_CREATE_REVIEW_RESET,
    LINK_ALL_USER_DETAILS_SUCCESS,
    LINK_ALL_USER_DETAILS_FAIL,
    LINK_ALL_USER_DETAILS_REQUEST,
    LINK_TOP_REQUEST,
    LINK_TOP_SUCCESS,
    LINK_TOP_FAIL,
    LINK_UPDATE_LIKES,
    LINK_ERROR
  } from '../constants/linkConstants'
  
  export const linkListReducer = (state = { links: [] }, action) => {
    switch (action.type) {
      case LINK_LIST_REQUEST:
        return { loading: true, links: [] }
      case LINK_LIST_SUCCESS:
        return {
          loading: false,
          links: action.payload.links,
          pages: action.payload.pages,
          // page: action.payload.page,
        }
      case LINK_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const linkDetailsReducer = (
    state = { link: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case LINK_DETAILS_REQUEST:
        return { loading: true, ...state }
      case LINK_DETAILS_SUCCESS:
        return { loading: false, link: action.payload }
      case LINK_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
 
  export const listUserLinks = (state = { links: [] }, action) => {
    
    switch (action.type) {
      case LINK_USER_LIST_REQUEST:
        return { loading: true, links: [] }
      case LINK_USER_LIST_SUCCESS:
        return {
          loading: false,
          links: action.payload.links,
          pages: action.payload.pages,
          // page: action.payload.page,
        }
  case   LINK_USER_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
export const userLinkDetailsReducer = (
    state = { links: [] },
    action
  ) => {
    switch (action.type) {
      case LINK_USER_DETAILS_REQUEST:
        return { loading: true,links: []  }
      case LINK_USER_DETAILS_SUCCESS:
        return {  loading: false,
          links: action.payload.links,
          pages: action.payload.pages }
      case LINK_USER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userAllLinkDetailsReducer = (
    state = { links: [] },
    action
  ) => {
    switch (action.type) {
      case LINK_ALL_USER_DETAILS_REQUEST:
        return { loading: true,links: []  }
      case LINK_ALL_USER_DETAILS_SUCCESS:
        return {  loading: false,
          links: action.payload.links,
          pages: action.payload.pages }
      case LINK_ALL_USER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }


  export const linkDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case LINK_DELETE_REQUEST:
        return { loading: true }
      case LINK_DELETE_SUCCESS:
        return { loading: false, success: true }
      case LINK_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const linkCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case LINK_CREATE_REQUEST:
        return { loading: true }
      case LINK_CREATE_SUCCESS:
        return { loading: false, success: true, link: action.payload }
      case LINK_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case LINK_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const linkUpdateReducer = (state = { link: {} }, action) => {
    switch (action.type) {
      case LINK_UPDATE_REQUEST:
        return { loading: true }
      case LINK_UPDATE_SUCCESS:
        return { loading: false, success: true, link: action.payload }
      case LINK_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case LINK_UPDATE_RESET:
        return { link: {} }
      default:
        return state
    }
  }
  
  export const linkReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case LINK_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case LINK_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case LINK_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case LINK_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const linkTopRatedReducer = (state = { links: [] }, action) => {
    switch (action.type) {
      case LINK_TOP_REQUEST:
        return { loading: true, links: [] }
      case LINK_TOP_SUCCESS:
        return { loading: false, links: action.payload }
      case LINK_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const linkUpdateLikesReducer=(state  = { links: [] }, action)=> {
    const { type, payload } = action;
    switch (type) {
      case LINK_UPDATE_LIKES:
        return {
          ...state,
          links: state.links.map((link) =>
            link._id === payload.linkId ? { ...link, likes: payload.likes } : link
          ),
          loading: false,
        };
        case LINK_ERROR:
          return {
            ...state,
            error: payload,
            loading: false,
          };
      default:
        return state;
    }
  }
  