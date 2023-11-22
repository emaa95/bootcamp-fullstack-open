import React from 'react'

interface CoursePartProps {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts : CoursePartProps[];
}

const Total: React.FC<ContentProps> = ({ courseParts}) => {
    
    const total = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)
    return(
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

export default Total