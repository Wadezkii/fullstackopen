const Course = ({ courses }) => {
    return (
      <div>
        <h1>notta kurssia kerrakseen</h1>
        {courses.map(course => (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map(part => (
              <div key={part.id}>
                <p>{part.name} {part.exercises}</p>
              </div>
            ))}
            <b>total: {course.parts.reduce((total, part) => total + part.exercises, 0)}</b>
          </div>
        ))}
      </div>
    )
  }
  
    
export default Course