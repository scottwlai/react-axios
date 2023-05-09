import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    Axios.get("http://nodejs-example-express-rds.eba-h73p2msc.us-east-2.elasticbeanstalk.com/courses").then(
      (response) => {
        console.log(response);
        setCourses(response.data);
      }
    );
  };

  return (
    <div>
      <button onClick = {getCourses}>
        Get Courses
      </button>
      {courses?.map((course, index) => {
        return (
          <div key={index}>
            <h1>{course.courseNumber.department} {course.courseNumber.number}: {course.name}</h1>
            <h2>{course.instructors.join(" & ")}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
