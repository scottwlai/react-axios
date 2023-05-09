import React, { useState } from "react";
import Axios from "axios";
import { format } from "date-fns";

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
      {courses?.map((course, i) => {
        return (
          <div key={i}>
            <h1>
              {course.courseNumber.department} {course.courseNumber.number}: {course.name} {course.nickname ? "(" + course.nickname + ")" : ""}
            </h1>
            <h2>{course.instructors.join(" & ")}</h2>
            <h3>{course.term.semester} {course.term.year}</h3>
            <h3>Meets</h3>
            {course.meets?.map((meet, j) => {
              var meetData = [meet.days.join("")];
              if (meet.startTime) {
                meetData.push(format(new Date(meet.startTime), "h:mm a") + " - " + format(new Date(meet.endTime), "h:mm a"));
              }
              if (meet.room.building && meet.room.number) {
                meetData.push(meet.room.building + " " + meet.room.number);
              } else if (meet.room.building) {
                meetData.push(meet.room.building);
              }
              return (
                <div key={j}>
                  <p>
                    {meetData.join(", ")}
                  </p>
                </div>
              );
            })}
            <h3>Misc.</h3>
            <p>Grade: {course.grade}</p>
            <p>Unique Number: {course.uniqueNumber}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
