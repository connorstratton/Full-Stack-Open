const Course = ({ course }) => {
  return(
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Header = (props) => {
  console.log(props)
  return(
    <h2>{props.course.name}</h2>
  )
}

const Content = ({ course }) => {
  console.log(course)
  return(
    <div>
      
        {course.parts.map(part => 
          <Part key={part.id} part={part.name} exercise={part.exercises}/>
        )}
      
    </div>
  )
}


const Total = ({ course }) => {
  console.log(course)

  const sum = course.parts.reduce((s, p) => s + p.exercises, 0)

  return(
    <div>
        <p><b>total of {sum} exercises</b></p>
    </div> 
  )
}

export default Course