import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import RootLayout from "./components/layout/RootLayout";
const TasksPage = lazy(() => import("./pages/home/HomePage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback="Loading...">
              <TasksPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
