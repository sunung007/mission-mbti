import "./MainPage.css";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export default function MainPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [copyMsg, setCopyMsg] = useState("");

  const surveyOnClicked = () => {
    navigate("/survey");
  };

  const shareToKakaotalk = () => {
    window.alert("아직 준비되지 않은 기능이예요!");
  };

  const shareToLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyMsg(t("MainPage.share.alertMsg.link"));

    let timer = undefined;
    timer = setTimeout(() => {
      setCopyMsg("");
      if (timer) clearTimeout(timer);
    }, 2000);
  };

  return (
    <div id="MainPage" className="page">
      <div className="title">
        <div className="line1">{t("MainPage.title.line1")}</div>
        <div className="line2">{t("MainPage.title.line2")}</div>
        <p className="info">
          {t("MainPage.title.info.line1")}
          <br />
          {t("MainPage.title.info.line2")}
        </p>
      </div>

      <div className="body">
        <button id="StartResearchBtn" type={"button"} onClick={surveyOnClicked}>
          {t("MainPage.body.StartResearchBtn")}
        </button>
      </div>

      <div className="share">
        <div className="subsection-title">{t("MainPage.share.title")}</div>

        {copyMsg?.length > 0 && <div className="copy-msg">{copyMsg}</div>}

        {/* TODO : 버튼 클릭시 행동 */}
        <div className="btns">
          <li
            title={t("MainPage.share.btns.kakaotalk")}
            onClick={shareToKakaotalk}
          >
            <img
              src={require("../../assets/images/share_logos/kakaotalk.png")}
              alt={t("MainPage.share.btns.kakaotalk")}
            />
          </li>
          <li title={t("MainPage.share.btns.link")} onClick={shareToLink}>
            <img
              src={require("../../assets/images/share_logos/link.png")}
              alt={t("MainPage.share.btns.link")}
            />
          </li>
        </div>
      </div>
    </div>
  );
}
