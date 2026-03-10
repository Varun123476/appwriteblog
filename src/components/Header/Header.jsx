import { useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { ProfileMenu, Logo } from "../index";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const baseClass =
    "text-gray-700 hover:text-orange-500 font-medium transition-colors";

  const activeClass =
    "text-orange-600 border-b-2 border-orange-500";

  const navLinks = [
    { label: "Home", to: "/", active: null },
    { label: "My Posts", to: "/my-posts", active: true },
    { label: "Add Post", to: "/add-post", active: true },
    { label: "Login", to: "/login", active: false },
    { label: "Sign Up", to: "/signup", active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Brand */}
        <Link to="/">
          <Logo width="80px" />
        </Link>

        {/* Nav links */}
        <ul className="hidden sm:flex items-center gap-6 list-none m-0 p-0">
          {navLinks
            .filter(({ active }) => active === null || active === authStatus)
            .map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    isActive ? `${baseClass} ${activeClass}` : baseClass
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
        </ul>

        {/* Auth action */}
        <div className="flex items-center gap-3">
                  {authStatus ? (
                    <ProfileMenu />
                  ) : (
                    <Link
                      to="/signup"
                      className="
                        px-4 py-2 text-sm font-semibold rounded-lg
                        bg-orange-500 text-white
                        hover:bg-orange-600 transition-colors duration-150
                      "
                    >
                      Get Started
                    </Link>
                  )}
              </div>
      </nav>
    </header>
  );
}

export default Header;