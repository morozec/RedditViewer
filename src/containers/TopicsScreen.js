import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    return {}
}

const TopicsScreen = () => {
    return <h2>Where are my topics?</h2>
}

export default connect(mapStateToProps)(TopicsScreen)

