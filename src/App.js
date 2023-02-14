import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import LoadingResultPage from "./pages/LoadingResultPage/LoadingResultPage";
import {useTranslation} from "react-i18next";
import ResultPage from "./pages/ResultPage/ResultPage";

function App() {
  const {t} = useTranslation();

  return (
    <div className="App">
      <header className="App-header"></header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/loadingResult" element={<LoadingResultPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>

      <footer id="MainFooter">
        <div className="container">
          <p>
            {t("App.footer.info.line1")}
            <br />
            {t("App.footer.info.line2")}
          </p>

          <button className="church-btn">
            <a
              href="http://www.choonghyunchurch.or.kr/main/main.html"
              target={"_blank"}
              rel="noreferrer"
            >
              {t("App.footer.btns.toChurch")}
            </a>
          </button>
          <button className="church-btn">
            <a
              href="http://www.choonghyunchurch.or.kr/main/main.html"
              target={"_blank"}
              rel="noreferrer"
            >
              {t("App.footer.btns.toGether")}
            </a>
          </button>
          <div className="church-img">
            <img
              src={require("./assets/images/church-logo.png")}
              alt={t("App.footer.churchImg.alt")}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
