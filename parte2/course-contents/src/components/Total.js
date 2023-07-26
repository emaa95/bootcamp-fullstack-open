import React from 'react'

function Total({parts}) {
    const total = parts.reduce((sum,part)=> sum + part.exercises, 0)
    return (
        <div>
            <p>total of {total} exercises</p>
        </div>
    )
}

export default Total