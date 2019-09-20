import _ from 'lodash';
import React from 'react'


const TopicFilter = (props) => {

    const renderFilter = (id, label) => {
        const className = props.selected === id ? 'selected' : undefined;
        return (
            <a
                key={id}
                href='#'
                className={className}
                onClick={() => onFilterClick(id)}
            >
                {label}
            </a>
        )
    }
    
    const onFilterClick = (id, selected) => {
        if (id === selected) return
        props.onChanged(id)
    }

    return (
        <div className={props.className}>
            {renderFilter('all', 'All')}
            {_.map(props.topics, (topic, topicId) => renderFilter(topicId, topic.title))}
        </div>
    )
}




export default TopicFilter