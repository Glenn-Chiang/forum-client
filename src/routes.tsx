import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/HomePage";
import { AuthLayout } from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import ProfilePage from "./pages/ProfilePage";
import BaseLayout from "./pages/BaseLayout";

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

          <Route path="profiles">
            <Route path=":id" element={<ProfilePage/>}/>
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
