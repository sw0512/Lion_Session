// signup.jsx

import React, { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [id, setId] = useState(""); // id: 초기값, setId: id값 변경 함수, "": 초기값(빈 문자열)
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(
        "ID:",
        id,
        "PASSWORD:",
        password,
        "NAME:",
        name,
        "PHONE:",
        phone,
      );
    } catch (err) {
      console.error("handleSubmit 오류:", err);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-page">
        <h1 className="signup-title">SIGNUP</h1>
        <form className="signup-form-wrapper" onSubmit={handleSubmit}>
          <div className="signup-form">
            <div className="signup-id-password">
              <label className="signup-label" htmlFor="id">
                ID
              </label>
              <input
                id="id"
                type="text"
                className="signup-input"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="signup-id-password">
              <label className="signup-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signup-id-password">
              <label className="signup-label" htmlFor="name">
                NAME
              </label>
              <input
                id="name"
                type="text"
                className="signup-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="signup-id-password">
              <label className="signup-label" htmlFor="phone">
                PHONE NUMBER
              </label>
              <input
                id="phone"
                type="text"
                className="signup-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="signup-button"
            onClick={() => console.log("회원가입 버튼 클릭됨")}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
