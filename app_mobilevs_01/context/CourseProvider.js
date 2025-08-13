import { createContext, useState } from 'react';

export const CourseContext = createContext();

export default function CourseProvider({ children }) {
  const [selCourse, setSelCourse] = useState('');
  const [selLesson, setSelLesson] = useState(null);

  return (
    <CourseContext.Provider
      value={{ selCourse, setSelCourse, selLesson, setSelLesson }}>
      {children}
    </CourseContext.Provider>
  );
}
