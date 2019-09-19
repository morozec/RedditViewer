import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './TopicsScreen.css';
import * as topicsActions from '../store/topics/actions';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';



const TopicsScreen = (props) => {
    
    console.log(props)
    const {dispatch} = props
    
    //component did mount
    useEffect(() => {
        console.log('fetch')
        dispatch(topicsActions.fetchTopics())
    }, [dispatch])

    const renderLoading = () => <p>Loading...</p>
    const renderRow = (row) => (
        <div>
            <h3>{row.title}</h3>
            <p>{row.description}</p>
        </div>
    )
    
    if (!props.rowsById) {
        console.log('loading...')
        return renderLoading()
    }
    
    return (
        <div className='TopicsScreen'>
            <ListView 
                rowsIdArray={props.rowsIdArray}
                rowsById = {props.rowsById}
                renderRow = {renderRow} />
        </div>
    )

    
}

// пропсы, которые мы хотим получить из глобального стора
const mapStateToProps = (state) => {
    return {
        rowsById:topicsSelectors.getTopicsByUrl(state),
        rowsIdArray:topicsSelectors.getTopicsUrlArray(state)
    }
}

export default connect(mapStateToProps)(TopicsScreen)

