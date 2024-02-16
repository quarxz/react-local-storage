import { useEffect, useState } from "react";
import "./App.css";

// Speichern von Smart User Information
// dark mode, status
function App() {
  const [counter, setCounter] = useState(() => {
    const newCounter = localStorage.getItem("counter");
    if (newCounter) {
      return JSON.parse(newCounter);
    } else {
      return 0;
    }
  });
  const [user, setUser] = useState(() => {
    const newUser = localStorage.getItem("user");
    if (newUser) {
      return JSON.parse(newUser);
    } else {
      return {
        name: "",
        email: "",
      };
    }
  });
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    function saveToLocalStorage() {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("counter", JSON.stringify(counter));
    }
    saveToLocalStorage();
  }, [user]);

  return (
    <>
      {user.name ? (
        <div className="counter-content">
          <button
            onClick={() => {
              localStorage.setItem("counter", JSON.stringify(counter + 1));
              setCounter((prev) => prev + 1);
            }}
          >
            +
          </button>
          <p className="counter">{counter}</p>
          <button
            onClick={() => {
              localStorage.setItem("counter", JSON.stringify(counter - 1));
              setCounter((prev) => prev - 1);
            }}
          >
            -
          </button>
        </div>
      ) : undefined}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUser({ ...inputUser });
          setInputUser({ name: "", email: "" });
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={inputUser.name}
          onChange={(e) => {
            setInputUser({ ...inputUser, name: e.target.value });
          }}
        />
        <label htmlFor="email">eMail:</label>
        <input
          id="email"
          type="email"
          value={inputUser.email}
          onChange={(e) => {
            setInputUser({ ...inputUser, email: e.target.value });
          }}
        />
        {user.name ? undefined : <button typeof="submit">Login</button>}
      </form>
      <h2>Logged User:</h2>
      <p>name: {user.name}</p>
      <p>email: {user.email}</p>
      {user.name ? (
        <button
          onClick={() => {
            setUser({ name: "", email: "" });
            setCounter(0);
          }}
        >
          Logout
        </button>
      ) : undefined}
    </>
  );
}

export default App;
