import { Link } from "react-router";
import { drinks } from "../data/drinks";

export default function HomePage() {
  return (
    <main>
      <h1>메뉴를 선택하세요!</h1>

      <div className="card-grid">
        {drinks.map((drink) => (
          <Link
            className="session-card"
            key={drink.id}
            to={`/drinks/${drink.id}`}
          >
            <span>{drink.tag}</span>
            <h2>{drink.title}</h2>
            <p>{drink.description}</p>
            <strong>상세 보기 →</strong>
          </Link>
        ))}
      </div>
    </main>
  );
}
