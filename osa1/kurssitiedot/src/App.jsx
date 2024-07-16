//Shows the course name
const Header = ({course_name}) => {
  return (
  <div>
    <h1>
      {course_name}
    </h1>
  </div>
  )
}

//Shows the contents of the course
const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].name} ex={parts[0].exercises}/>
      <Part part={parts[1].name} ex={parts[1].exercises}/>
      <Part part={parts[2].name} ex={parts[2].exercises}/>
    </div>
  )
}

//Shows total number of exerices
const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </div>
  )
}

//Helper function for _Content_
const Part = ({part, ex}) => {
  return (
    <p>{part} {ex}</p>
  )
}

const App = () => {

  //Constants for text displayed on the page
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  //Srtucture of the page
  return (
    <div>
      <Header course_name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App