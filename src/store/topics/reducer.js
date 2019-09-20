import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

const initialState = Immutable({
    topicsByUrl: undefined,
    selectedTopicUrls: [],
    selectionFinalized: false
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
        case types.TOPICS_SELECTION_FINILIZED:
            return state.merge({
                selectionFinalized: true
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

export const isTopicSelectionValid = (state) => state.topics.selectedTopicUrls.length === 3

export const isTopicSelectionFinalized = (state) => state.topics.selectionFinalized