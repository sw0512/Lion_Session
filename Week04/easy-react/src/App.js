import ProfileCard from './compnents/ProfileCard';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
      <ProfileCard
        name="김상우"
        age={25}
        dream="프론트엔드 개발자"
        emoji="🧑‍💻"
        hobby="코딩, 여행"
        mbti="INTP"
      />
    </div>
  );
}

export default App;