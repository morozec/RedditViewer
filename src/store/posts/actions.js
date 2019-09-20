import _ from 'lodash';
import * as types from './actionTypes';
import redditService from '../../services/reddit';
import * as topicsSelectors from '../topics/reducer';

export function fetchPosts() {
    return async (dispatch, getState) => {
        try {
            const selectedTopicsUrls = topicsSelectors.getSelectedTopicUrls(getState())
            const fetchedPromises = _.map(selectedTopicsUrls, (topicUrl) => redditService.getPostsFromSubreddit(topicUrl))
            const topicsPosts = await Promise.all(fetchedPromises)
            const postsById = _.keyBy(_.flatten(topicsPosts), post => post.id)
            dispatch({ type: types.POSTS_FETCHED, postsById })
        } catch (error) {
            console.log(error)
        }
    }
}

export function changeFilter(newFilter) {
    return ({ type: types.FILTER_CHANGED, filter: newFilter })
}

export function selectPost(postId) {
    return ({ type: types.POST_SELECTED, postId })
}