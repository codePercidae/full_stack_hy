const Header = ({name}) => {
    return <h1>{name}</h1>
  }
  
const Total = ({parts}) => {
const total = parts.reduce((p, c) => p+c.exercises, 0)
return <b>Number of exercises {total}</b>
}

const Part = (props) => {
return (
    <p>
    {props.part} {props.exercises}
    </p>
)
}

const Content = ({parts}) => {
//console.log(parts)
return (
    <div>
    {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
)
}

export default function Course({course}){
return (
    <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
)
}