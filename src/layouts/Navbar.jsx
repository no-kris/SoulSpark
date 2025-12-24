import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Prayer");

  return (
    <nav className="navbar">
      <div className="navbar__content">
        {["Prayer", "Gratitude", "Spiritual"].map((tab) => (
          <button
            key={tab}
            className={`button button--tab ${
              activeTab === tab ? "button--tab-active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
