import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BaseLayout from "./pages/BaseLayout";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import Home from "./pages/HomePage";
import PostPage from "./pages/PostPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout/>}>
          <Route index element={<Home />} />

          <Route path="posts">
            <Route index element={<Home />} />
            <Route path=":id" element={<PostPage/>}/>
            <Route path="create" element={<CreatePostPage/>}/>
            <Route path=":id/edit" element={<EditPostPage/>}/>
          </Route>
        </Route>
        
        <Route element={<AuthLayout/>}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
