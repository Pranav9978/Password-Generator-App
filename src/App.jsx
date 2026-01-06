import { useEffect, useState } from "react";
import "./App.css";
import { KeyRound, Link } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  // 🌙 THEME STATE
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // APPLY THEME
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // AUTO GENERATE PASSWORD ON LOAD (optional but nice UX)
  useEffect(() => {
    generatePassword();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const generatePassword = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (number) chars += "0123456789";
    if (symbol) chars += "!@#$%^&*";

    if (!chars) {
      toast.error("Select at least one option!");
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    toast.info("New password generated");
  };

  const copyPassword = async () => {
    if (!password) {
      toast.error("No password to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    } catch (error) {
      toast.error("Clipboard access denied!");
    }
  };

  return (
    <div className="container">
      {/* 🌙☀️ THEME TOGGLE */}
      <div className="theme-toggle">
        <button type="button" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <h2>
        Password Generator <KeyRound size={20} />
      </h2>

      <div className="output">
        <input type="text" value={password} readOnly />
        <button type="button" onClick={copyPassword}>
          Copy
        </button>
      </div>

      <div className="settings">
        <label>
          Length: {length}
          <input
            type="range"
            min="8"
            max="42"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={upper}
            onChange={() => setUpper(!upper)}
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={lower}
            onChange={() => setLower(!lower)}
          />
          Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber(!number)}
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={symbol}
            onChange={() => setSymbol(!symbol)}
          />
          Symbols
        </label>
      </div>

      <button className="generate" type="button" onClick={generatePassword}>
        Generate Password
      </button>

      {/* 🔔 TOAST CONTAINER */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={theme === "dark" ? "dark" : "light"}
      />

      {/* ✅ FOOTER */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Password Generator App | Developed by{" "}
          <a
            href="https://pranav-portfolio-theta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Pranav Khegade</strong>
          </a>
        </p>
      </footer>
    </div>
  );
}
