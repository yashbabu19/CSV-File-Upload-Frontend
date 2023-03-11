
import React, { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded email and password for testing purposes
    if (email === "test@example.com" && password === "password") {
      const token = generateToken();
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        const uniqueData = removeDuplicates(results.data);
        localStorage.setItem("StudentData", JSON.stringify(results.data));
        setStudentData(uniqueData);
      }
    });
  };

  const removeDuplicates = (data) => {
    const uniqueData = [];
    const map = new Map();
    data.forEach((row) => {
      const key = `${row.Roll_No}`;
      if (!map.has(key)) {
        map.set(key, true);
        uniqueData.push(row);
      }
    });
    return uniqueData;
  };
  const handleExport = (e) => {
    const data = localStorage.getItem("StudentData");
    const json = JSON.parse(data);
    const uniqueData = json.filter(
      (row, index, self) =>
        index ===
        self.findIndex(
          (r) =>
            r.name === row.name &&
            r.Roll_No === row.Roll_No &&
            r.address === row.address &&
            r.Institute === row.Institute &&
            r.Course === row.Course &&
            r.email === row.email
        )
    );
    const blob = new Blob([JSON.stringify(uniqueData)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = "students.json";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const generateToken = () => {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 2);
    const token = {
      value: randomString,
      expiry: expiry.getTime()
    };
    return JSON.stringify(token);
  };

  return (
    <div>
      {!isLoggedIn && (
        <Login
          handleLogin={handleLogin}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      )}
      {isLoggedIn && (
        <Dashboard
          handleImport={handleImport}
          handleExport={handleExport}
          studentData={studentData}
        />
      )}
    </div>
  );
}

export default App;