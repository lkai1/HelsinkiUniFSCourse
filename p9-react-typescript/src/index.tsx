import React from "react";
import ReactDOM from "react-dom";
import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartWDesc extends CoursePartBase {
    description: string;
  }
  interface CoursePartOne extends CoursePartWDesc {
    name: "Fundamentals";
  }

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends CoursePartWDesc {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

  const Part: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    const assertNever = (value: never): never => {
      throw new Error {
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      };
    };
    courseParts.forEach(part => {
      switch (part.name) {
        case "Fundamentals":
          break;
        case "Using props to pass data":
          break;
        case "Deeper type usage":
          break;
        default:
          return assertNever(part)
      }
    })
    return (
      <p>
        {courseParts.filter(part => part.name)}
      </p>
    )
  };
  const Content: React.FC<{ courseParts: CoursePart[] }> = props => {
    return (
        <span>
            {props.courseParts.map(cp => <p key={cp.name}>{cp}</p>)}
        </span>
    )
}
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Part courseParts={courseParts} />
      <Header courseName={courseName} />
      <Content courseParts={<Part courseParts={courseParts} />} />
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
