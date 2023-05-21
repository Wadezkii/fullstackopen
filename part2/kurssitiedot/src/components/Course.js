const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => (
                <div key={part.id}>
                    <p>{part.name} {part.exercises}</p>
                </div>
            ))}
            <b>total: {totalExercises}</b>
        </div>
    )
}
    
export default Course