import React from "react";
import type {CoursePart} from "../App";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.kind) {
      case "basic":
        return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div>
            <i>{part.description}</i>
            </div>
          </p>
        );
      case "group":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div><i>Group Projects: {part.groupProjectCount}</i></div>
          </div>
        );
      case "background":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div><i>{part.description}</i></div>
            <a href={part.backgroundMaterial}>Background Material</a>
          </div>
        );
      case "special":
        return (
          <div>
            <strong>{part.name} {part.exerciseCount}</strong>
            <div><i>{part.description}</i></div>
            <div>Requirements: {part.requirements.join(", ")}</div>
          </div>
        );
      default:
        return assertNever(part);
    }
  };
  
  function assertNever(value: never): never {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  }

export default Part;