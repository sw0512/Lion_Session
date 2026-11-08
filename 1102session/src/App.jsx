import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DrinkDetailPage from "./pages/DrinkDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useFavoriteStore } from "./stores/useFavoriteStore";

function Header() {
  const count = useFavoriteStore((state) => state.favoriteIds.length);

  return (
    <header>
      <nav>
        <Link to="/">전체 메뉴</Link>

        <Link to="/favorites">
          찜한 메뉴 <b>{count}</b>
        </Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/drinks/:drinkId" element={<DrinkDetailPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />

        <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
      </Routes>
    </>
  );
}
