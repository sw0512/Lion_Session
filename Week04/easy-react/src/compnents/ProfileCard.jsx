// src/ProfileCard.jsx

import { useState } from 'react';

function ProfileCard({ name, age, dream, emoji, hobby, mbti }) {
  const [likes, setLikes] = useState(0);
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }
  function handleLike() {
    setLikes(likes + 1);
  }

  function handleReset() {
    setLikes(0);
  }


  return (
    <div style={{
      border: '2px solid #61dafb',
      borderRadius: '16px',
      padding: '24px',
      width: '280px',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ fontSize: '48px' }}>{emoji}</div>
      <h2>{name}</h2>
      <p>나이: {age}세</p>
      <p>꿈: {dream}</p>
      <p>취미: {hobby}</p>
      <p>mbti: {mbti}</p>
      <div style={{ marginTop: '16px' }}>
        <p style={{ fontSize: '20px' }}>❤️ {likes}</p>
        <button onClick={handleLike} style={{ marginRight: '8px' }}>+ 좋아요</button>
        <button onClick={handleReset}>초기화</button>
        <br />
        <button onClick={handleToggle} style={{marginTop: '16px'}}>
          {toggle ? '소개 숨기기' : '소개 보기'}
        </button>
        {toggle && (
          <div style={{ marginTop: '16px', textAlign: 'left' }}>
            <p>안녕하세요! 저는 {name}입니다.</p>
            <p>저는 {age}살이고, 꿈은 {dream}입니다.</p>
            <p>취미는 {hobby}이며, MBTI는 {mbti}입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;