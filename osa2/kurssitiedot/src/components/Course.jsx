const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Content = ({ course }) => {
  console.log("course", course);
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((final, part) => final + part.exercises, 0);
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
