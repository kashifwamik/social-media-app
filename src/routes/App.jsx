import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import { useState } from "react";
import PostListContextProvider from "../store/post-list-store";
import { Outlet } from "react-router-dom";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListContextProvider>
      <div className="app-container">
        <Sidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        ></Sidebar>
        <div className="content">
          <Header></Header>
          <div className="main-content">
            <Outlet></Outlet>
          </div>

          <Footer></Footer>
        </div>
      </div>
    </PostListContextProvider>
  );
}

export default App;
