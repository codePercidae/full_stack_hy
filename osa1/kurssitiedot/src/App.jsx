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
  console.log(props)
  return (
    <div>
      <Part part={props.p1} ex={props.e1}/>
      <Part part={props.p2} ex={props.e2}/>
      <Part part={props.p3} ex={props.e3}/>
    </div>
  )
}

//Shows total number of exerices
const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
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
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  //Srtucture of the page
  return (
    <div>
      <Header course_name={course}/>
      <Content p1={part1.name} e1={part1.exercises} p2={part2.name} e2={part2.exercises} p3={part3.name} e3={part3.exercises}/>
      <Total e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}/>
    </div>
  )
}

export default App