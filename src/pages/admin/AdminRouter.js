import {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import AdminLoginPage from "./AdminPage/AdminPage";
import {ADMIN_LOGIN_PATH} from "../../assets/constants";
import QuestionManagePage from "./QuestionManagePage/QuestionManagePage";
import {adminState} from "../../store/admin";

export default function AdminRouter() {
  const admin = useRecoilValue(adminState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== ADMIN_LOGIN_PATH && !admin) {
      navigate(ADMIN_LOGIN_PATH);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route exact path="/questions" element={<QuestionManagePage />} />
    </Routes>
  );
}
