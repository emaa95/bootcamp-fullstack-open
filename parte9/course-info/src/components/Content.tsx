interface CoursePartProps {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts : CoursePartProps[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    );
  };

export default Content
