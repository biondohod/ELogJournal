import { Link, NavLink } from "react-router-dom";
import profilePlaceholder from "@assets/img/profilePlaceholder.png";
import bell from "@assets/icons/bell.svg";
import "./header.scss";
import { useLogout } from "../../query/mutations";
import { useNotifications } from "../../query/queries";

const Header = () => {
  const { mutateAsync: logOut, isPending } = useLogout();
  const { data } = useNotifications();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__container">
          <h1 className="header__title">ЭЖАН</h1>
          <nav className="header__nav">
            <NavLink to="/" className="header__link">
              Список объектов
            </NavLink>
            <NavLink to="/admin" className="header__link">
              Админ панель
            </NavLink>
            <NavLink to="/organizations" className="header__link">
              Организации
            </NavLink>
          </nav>
        </div>
        <div className="header__container">
          <div className="header__user">
            <Link
              to={`/notifications`}
              className="header__link header__link--account"
            >
              <img src={bell} alt="" className="header__img" />
            </Link>
            <Link
              to={`/profile/${localStorage.getItem("currentUserId")}`}
              className="header__link header__link--account"
            >
              <img src={profilePlaceholder} alt="" className="header__img" />
            </Link>
            <button
              className="header__logout"
              onClick={handleLogout}
              disabled={isPending}
            >
              Выход
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
