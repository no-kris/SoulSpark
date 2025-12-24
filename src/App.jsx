import { useState } from "react";
import "./css/index.css";
import Header from "./layouts/Header";

function App() {
  const [user, setUser] = useState(null);

  return <Header user={user} setUser={setUser} />;
}

export default App;
