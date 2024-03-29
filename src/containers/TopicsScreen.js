import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './TopicsScreen.css';
import * as topicsActions from '../store/topics/actions';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';



const TopicsScreen = (props) => {

    console.log(props)
    const { dispatch } = props

    //component did mount
    useEffect(() => {
        console.log('fetch')
        dispatch(topicsActions.fetchTopics())
    }, [dispatch])

    const renderLoading = () => <p>Loading...</p>


    const onRowClick = (rowId) => {
        dispatch(topicsActions.selectTopic(rowId))
    }

    const renderRow = (rowId, row) => {
        const selected = props.selectedRowsById[rowId]
        return (
            <ListRow
                rowId={rowId}
                onClick={onRowClick}
                selected={selected}>

                <h3>{row.title}</h3>
                <p>{row.description}</p>

            </ListRow>
        )
    }

    const onNextScreenClick = () => {
        dispatch(topicsActions.finalizeTopicsSelection())
    }

    if (!props.rowsById) {
        console.log('loading...')
        return renderLoading()
    }

    return (
        <div className='TopicsScreen'>
             <h3>Choose 3 topics of interest</h3>
            <ListView
                rowsIdArray={props.rowsIdArray}
                rowsById={props.rowsById}
                renderRow={renderRow} />

            {props.canFinalizeSelction &&
                <button className='NextScreen' onClick={onNextScreenClick} />}
        </div>
    )


}

// пропсы, которые мы хотим получить из глобального стора
const mapStateToProps = (state) => {
    return {
        rowsById: topicsSelectors.getTopicsByUrl(state),
        rowsIdArray: topicsSelectors.getTopicsUrlArray(state),
        selectedRowsById: topicsSelectors.getSelectedTopicsByUrl(state),
        canFinalizeSelction: topicsSelectors.isTopicSelectionValid(state)
    }
}

export default connect(mapStateToProps)(TopicsScreen)

