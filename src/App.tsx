import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import RootLayout from "./components/layout/RootLayout";

const MainPage = lazy(() => import("./pages/main/MainPage"));
const CourseDetailsPage = lazy(
  () => import("./pages/course-details/CourseDetailsPage"),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback="Loading...">
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="courses/:courseId"
          element={
            <Suspense fallback="Loading...">
              <CourseDetailsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
