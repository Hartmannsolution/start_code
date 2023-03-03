import React from 'react'

export const DisplayBoard = ({numberOfUsers }) => {
    
    return(
        <div className="display-board">
            <h4>Users Created</h4>
            <div className="number">
            {numberOfUsers}
            </div>
        </div>
    )
}