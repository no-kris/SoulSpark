import Button from "../../components/Button/Button";

const handleModeChange = (mode, setMode) => {
  if (mode === "login") {
    return (
      <>
        <Button
          onClick={() => setMode("signup")}
          text="CREATE AN ACCOUNT"
          className="button--text"
        />
        <Button
          onClick={() => setMode("reset")}
          text="FORGOT PASSWORD?"
          className="button--text"
        />
      </>
    );
  }
  if (mode === "signup") {
    return (
      <Button
        onClick={() => setMode("login")}
        text="ALREADY HAVE AN ACCOUNT?"
        className="button--text"
      />
    );
  }
  if (mode === "reset") {
    return (
      <Button
        onClick={() => setMode("login")}
        text="BACK TO LOGIN"
        className="button--text"
      />
    );
  }
};

export default handleModeChange;
