import _ from 'lodash';
import Immutable from 'seamless-immutable'
import * as types from './actionTypes';

const initialState = Immutable({
    postsById:undefined,
    currentFilter:"",
    currentPostId:undefined
})

export default function reduce(state = initialState, action = {}){
    switch(action.type){
        case types.POSTS_FETCHED:            
            return state.merge({
                postsById:action.postsById
            })
        default:
            return state
    }
}

export const getPosts = (state) => {
    const postsById = state.posts.postsById
    const postsIdArray = _.keys(postsById)
    return [postsById, postsIdArray]
}