import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import TopicsScreen from './containers/TopicsScreen';
import PostsSreen from './containers/PostsScreen';
import * as topicsSelectors from './store/topics/reducer';

const App = (props) => {
  return (
    <div className="App">
      {!props.isSelectionFinilized ?
        <TopicsScreen /> :
        <PostsSreen />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSelectionFinilized: topicsSelectors.isTopicSelectionFinalized(state)
  }
}

export default connect(mapStateToProps)(App);
