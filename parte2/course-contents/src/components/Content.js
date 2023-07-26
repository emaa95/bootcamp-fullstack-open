import React from 'react'
import Part from './Part'

function Content({parts}) {
  return (
    <div>
        {parts.map(part => (
            <Part key= {part.id} part={part.name} exercises={part.exercises}></Part>
        ))}
    </div>
  )
}

export default Content