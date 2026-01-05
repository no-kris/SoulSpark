import { useState } from "react";
import "./css/index.css";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import GuestBanner from "./components/GuestBanner";
import VerseCard from "./components/VerseCard";

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Prayer");

  const handleAuth = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
      });
    }
  };

  return (
    <>
      <Header
        user={user}
        handleAuth={handleAuth}
        navbar={<Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
      />
      <main className="main">
        {!user && <GuestBanner user={user} handleAuth={handleAuth} />}
        <VerseCard />
      </main>
    </>
  );
}

export default App;
