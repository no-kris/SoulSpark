import { useState } from "react";
import "./css/index.css";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Prayer");

  return (
    <Header
      user={user}
      setUser={setUser}
      navbar={<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
    />
  );
}

export default App;
