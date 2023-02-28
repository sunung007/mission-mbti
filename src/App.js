import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import LoadingResultPage from "./pages/LoadingResultPage/LoadingResultPage";
import {useTranslation} from "react-i18next";
import ResultPage from "./pages/ResultPage/ResultPage";
import ScrollToTop from "./hooks/ScrollToTop";
import {ReactComponent as ChurchLogo} from "./assets/images/choonghyun.svg";
import AdminRouter from "./pages/admin/AdminRouter";

function App() {
  const {t} = useTranslation();

  return (
    <div className="App">
      <header className="App-header"></header>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/survey" element={<SurveyPage />} />
          <Route exact path="/loadingResult" element={<LoadingResultPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>

      <footer id="MainFooter">
        <div className="container">
          <div className="church-img">
            <ChurchLogo />
          </div>

          <p>
            {t("App.footer.info.line1")}
            <br />
            {t("App.footer.info.line2")}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
