import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

const initialState = Immutable({
    topicsByUrl: undefined,
    selectedTopicUrls: []
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.TOPICS_FETCHED:
            return state.merge({
                topicsByUrl: action.topicsByUrl
            })
        case types.TOPICS_SELECTED:
            return state.merge({
                selectedTopicUrls: action.selectedTopicUrls
            })
        default:
            return state
    }
}

// селекторы
export const getTopicsByUrl = (state) => {
    return state.topics.topicsByUrl
}

export const getTopicsUrlArray = (state) => {
    return _.keys(state.topics.topicsByUrl)
}

export const getSelectedTopicUrls = (state) => {
    return state.topics.selectedTopicUrls;
}

export const getSelectedTopicUrlsMap = (state) => {
    return _.keyBy(state.topics.selectedTopicUrls)
}