import React from 'react'

const ListRow = (props) => {
    const onClick = () =>{
        props.onClick(props.rowId)
    }

    const backgroundColor = props.selected ? '#c0f0ff' : '#fff';
    return (
        <div
            style={{backgroundColor }}
            onClick = {onClick}
        >
            {props.children}
        </div>
    )
}
export default ListRow