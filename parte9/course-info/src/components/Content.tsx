import Part from "./Part";
import { ContentProps } from "../types";

const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map((part, index) => (
         
          <Part key={index} part={part}/>
          
        ))}
      </div>
    );
  };

export default Content
