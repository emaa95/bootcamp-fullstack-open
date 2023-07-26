import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'
function Course({courses}) {
  
    return (
    
    <div>
      {courses.map( course => (
        <div key={course.id}> 
          <Header course={course.name}></Header>
          <Content parts={course.parts}></Content> 
          <Total parts={course.parts}></Total>  
        </div>
      ) )}
        
    </div>
  )
}

export default Course