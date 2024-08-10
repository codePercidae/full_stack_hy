//Shows the course name
const Header = ({course_name}) => {
  console.log(course_name)
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
      {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
  )
}

//Shows total number of exerices
const Total = ({parts}) => {
  const total = parts.reduce((s, p) => {
    console.log(s,p)
    return p.exercises+s})
}

const Course = ({course}) => {
  return (
    <div>
      <Header course_name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>)
}

const App = () => {

  //Constants for text displayed on the page
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  //Srtucture of the page
  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App