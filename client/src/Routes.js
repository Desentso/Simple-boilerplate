import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const AppRoutes = React.lazy(() => import("./AppRoutes"))

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route exact path="/" element={<div className="text-center text-xl mt-6">Home page</div>} />

          <Route
            path="/app/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <div>
                <h2 className="text-xl text-center mt-10">404 Page Not Found</h2>
                <a href="/" className="text-lg underline block text-center mt-2">Back to homepage</a>
              </div>
            }
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
