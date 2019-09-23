import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';
import PostView from './../components/PostView'

const PostsSreen = (props) => {

    const { dispatch } = props

    useEffect(() => {
        dispatch(postsActions.fetchPosts())
    }, [dispatch])

    const renderLoading = () => <p>Loading...</p>

    const renderRow = (rowId, row) => {

        const selected = props.currentPost === row
        return (

            <ListRow
                rowId={rowId}
                onClick={onRowClick}
                selected={selected}
            >
                {!row.thumbnail ? false :
                    <img className="thumbnail" src={row.thumbnail} alt='thumbnail' />
                }
                <h3>{row.title}</h3>
            </ListRow>
        )
    }

    const onFilterChanged = (newFilter) => {
        dispatch(postsActions.changeFilter(newFilter))
    }

    const onRowClick = (rowId) => {
        
        dispatch(postsActions.selectPost(rowId))
    }

    if (!props.rowsById) return renderLoading()

    return (
        <div className='PostsScreen'>
            <div className='LeftPane'>
                <TopicFilter
                    className='TopicFilter'
                    topics={props.topicsByUrl}
                    selected={props.currentFilter}
                    onChanged={onFilterChanged} />
                <ListView
                    rowsIdArray={props.rowIdArray}
                    rowsById={props.rowsById}
                    renderRow={renderRow} />
            </div>
            <div className='ContentPane'>
                <PostView post={props.currentPost} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const [postsById, postsIdArray] = postsSelectors.getPosts(state)
    return {
        rowsById: postsById,
        rowIdArray: postsIdArray,
        topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
        currentFilter: postsSelectors.getCurrentFilter(state),
        currentPost: postsSelectors.getCurrentPost(state)
    }
}

export default connect(mapStateToProps)(PostsSreen)