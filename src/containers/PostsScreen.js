import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './PostsScreen.css'
import * as postsActions from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

const PostsSreen = (props) => {

    const { dispatch } = props

    useEffect(() => {
        dispatch(postsActions.fetchPosts())
    }, [dispatch])

    const renderLoading = () => <p>Loading...</p>

    const renderRow = (rowId, row) => (
        <ListRow rowId={rowId}>
            {!row.thumbnail ? false :
                <img className="thumbnail" src={row.thumbnail} alt='thumbnail'/>
            }
            <h3>{row.title}</h3>
        </ListRow>
    )

    if (!props.rowsById) return renderLoading()

    return (
        <div className='PostsScreen'>
            <ListView
                rowsIdArray={props.rowIdArray}
                rowsById={props.rowsById}
                renderRow={renderRow} />
        </div>
    )
}

const mapStateToProps = (state) => {
    const [postsById, postsIdArray] = postsSelectors.getPosts(state)
    return {
        rowsById: postsById,
        rowIdArray: postsIdArray
    }
}

export default connect(mapStateToProps)(PostsSreen)