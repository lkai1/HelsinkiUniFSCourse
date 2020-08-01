import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exercises = course.parts.map((e) => {
      return e.exercises
    })
    const total = exercises.reduce((s, p) => {
      return s + p;
    })
    return (
      <h4>total of {total} exercises </h4>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        <Header course={course[0]}/>
        <Part part={course[0].parts[0]} />
        <Part part={course[0].parts[1]} />
        <Part part={course[0].parts[2]} />
        <Part part={course[0].parts[3]} />
        <Total course={course[0]} />
        <Header course={course[1]}/>
        <Part part={course[1].parts[0]}/>
        <Part part={course[1].parts[1]}/>
        <Total course={course[1]}/>
      </div>
    )
  }
  const Course = ({ course }) => {
    return (
      <div>
        <Content course={course} />
      </div>
    )
  }

  export default Course