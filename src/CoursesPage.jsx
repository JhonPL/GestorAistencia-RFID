import React from "react";
import "./CoursesPage.css";

const courses = [
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
  {
    term: "Spring 2018",
    title: "Computer-Based Info Systems",
    code: "MIS 1883-002",
    date: "January 14 - May 4, 2018",
    time: "MW 1 - 2:45 pm",
  },
];

export default function MyCourses() {
  return (
    <div className="container">
      <nav className="nav">
        <img
          className="nav__logo"
          src="https://anima-uploads.s3.amazonaws.com/59a46af8422ee1000c9600c3/5a4bfe0376b11f000bb9ae49/5a4bfe0476b11f000dc44a39/img/homelogos%20%20interlocking%20%20white.svg"
          alt="Logo"
        />
        <ul>
          <li className="active">My courses</li>
        </ul>
      </nav>

      <main>
        <header className="page-header">
          <h1>My courses</h1>
        </header>

        <nav className="tab">
          <ul className="tab__list">
            <li className="tab__item active">
              <h4>Active</h4>
            </li>
          </ul>
        </nav>

        <div className="card-container">
          {courses.map((course, index) => (
            <div className="card" key={index}>
              <div className="card__inner">
                <div className="card__header">
                  <p className="small subtle card__header--term">{course.term}</p>
                  <h3>{course.title}</h3>
                  <p>{course.code}</p>
                </div>
                <div className="card__body">
                  <p className="subtle">{course.date}</p>
                  <p className="subtle">{course.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
