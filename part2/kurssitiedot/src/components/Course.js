const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => (
                <div key={part.id}>
                    <p>{part.name} {part.exercises}</p>
                </div>
            ))}
        </div>
    )
}
    
export default Course