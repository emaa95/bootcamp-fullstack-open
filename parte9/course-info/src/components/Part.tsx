import React from 'react'
import { PartProps } from '../types'

const Part : React.FC<PartProps> = ({part}) =>{
    switch (part.kind) {
        case "basic": 
            return (
                <p>
                    <h3>{part.name} {part.exerciseCount} </h3> 
                    {part.description}
                </p>
            )

        case "group": 
            return (
                <p>
                   <h3> {part.name} {part.exerciseCount} </h3> 
                    project exercises {part.groupProjectCount}
                </p>
            )
        
        case "background": 
            return (
                <p>
                    <h3>{part.name} {part.exerciseCount} </h3> 
                    <p>{part.description}</p> 
                    <p>{part.backgroundMaterial}</p>
                </p>
            )
        
        case "special":
            return(
                <p>
                    <h3>{part.name} {part.exerciseCount} </h3>
                    <p> {part.description} </p> 
                    <p>required skills: {`${part.requirements[0]}, ${part.requirements[1]}`}</p>
                </p>
            )
        default:
            return null
    }
}

export default Part