//Shows the course name
const Header = (props) => {
  console.log(props);
  return (
  <div>
    <h1>
      {props.course_name}
    </h1>
  </div>
  )
}

//Shows the contents of the course
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} ex={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} ex={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} ex={props.parts[2].exercises}/>
    </div>
  )
}

//Shows total number of exerices
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

//Helper function for _Content_
const Part = (props) => {
  return (
    <p>{props.part} {props.ex}</p>
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