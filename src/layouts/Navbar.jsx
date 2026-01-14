export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        {["prayer", "gratitude", "spirit"].map((tab) => (
          <button
            key={tab}
            className={`button button--tab ${
              activeTab === tab ? "button--tab-active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
}
