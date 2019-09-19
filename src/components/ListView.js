import _ from 'lodash';
import React from 'react'


const ListView = (props) => {

    const renderRowById = (renderRow, rowsById, rowId) => {
        return (
            <li key={rowId}>
                {renderRow(rowId, _.get(rowsById, rowId))}
            </li>
        )
    }

    return(
        <ul>
           {props.rowsIdArray.map(rowId => renderRowById(props.renderRow, props.rowsById, rowId))}
        </ul>
    )
}

export default ListView