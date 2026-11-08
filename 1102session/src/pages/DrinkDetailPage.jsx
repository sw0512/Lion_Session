import { Link, useParams } from "react-router";
import { drinks } from "../data/drinks";
import { useFavoriteStore } from "../stores/useFavoriteStore";

export default function DrinkDetailPage() {
  const { drinkId } = useParams();

  const drink = drinks.find((item) => item.id === drinkId);

  const isFavorite = useFavoriteStore((state) =>
    state.favoriteIds.includes(drinkId),
  );

  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <main>
      <Link className="back" to="/">
        ← 메뉴 목록
      </Link>

      <section className="detail-card">
        <p className="eyebrow">현재 URL</p>

        <code>
          /drinks/<mark>{drinkId}</mark>
        </code>

        <p className="hint">
          useParams()가 가져온 drinkId: <b>"{drinkId}"</b>
        </p>

        <span className="tag">{drink.tag}</span>
        <h1>{drink.title}</h1>
        <p className="description">{drink.description}</p>
        <button
          className={isFavorite ? "saved" : ""}
          onClick={() => toggleFavorite(drink.id)}
        >
          {isFavorite ? "♥ 찜 해제하기" : "♡ 찜하기"}
        </button>
      </section>
    </main>
  );
}
