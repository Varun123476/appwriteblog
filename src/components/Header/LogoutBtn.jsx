import { useDispatch } from "react-redux";
import authService from '../../appwrite/auth'
import {useNavigate} from "react-router-dom"
import { logout } from "../../features/authSlice"



function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-4 py-2 text-sm font-semibold rounded-lg
        text-amber-50 border border-gray-300
        hover:bg-gray-100 hover:text-red-600 hover:border-red-300
        transition-all duration-150
      "
    >
      Logout
    </button>
  );
}

export default LogoutBtn;