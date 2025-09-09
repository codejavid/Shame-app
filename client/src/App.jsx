import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./utils/routePaths";

export default function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.FEED} element={<Feed />} />
        <Route path={ROUTES.POST} element={<Post />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </RootLayout>
  );
}
