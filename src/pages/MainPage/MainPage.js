import "./MainPage.css";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import KakaoShareButton from "../../components/KakaoShareButton/KakaoShareButton";
import {ReactComponent as Title} from "../../assets/images/title.svg";
import {ReactComponent as MainTopImage} from "../../assets/images/mainpage/mainpage_top.svg";
import {ReactComponent as StartButton} from "../../assets/images/mainpage/mainpage_start.svg";
import {ReactComponent as ToChurch} from "../../assets/images/mainpage/mainpage_to_choonghyun.svg";
import {ReactComponent as ToGether} from "../../assets/images/mainpage/mainpage_to_gether.svg";
import {ReactComponent as Globe} from "../../assets/images/mainpage/mainpage_globe_icon.svg";

export default function MainPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [copyMsg, setCopyMsg] = useState("");

  const surveyOnClicked = () => {
    navigate("/survey");
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
        <div>
          <MainTopImage className="top" />
        </div>
        <div>
          <Title className="title" />
        </div>
      </div>

      <div className="body">
        <div onClick={surveyOnClicked} className="text">
          {t("MainPage.body.StartResearchBtn")}
        </div>
        <div className="img" onClick={surveyOnClicked}>
          <StartButton />
        </div>
      </div>

      <div className="to-family">
        <a
          href="http://www.choonghyunchurch.or.kr/main/main.html"
          target={"_blank"}
          rel="noreferrer"
        >
          <ToChurch />
        </a>
        <a
          href="https://app.gather.town/app/VYEVvurYdVLuQ8NF/Church"
          target={"_blank"}
          rel="noreferrer"
        >
          <ToGether />
        </a>
      </div>

      <div className="share">
        <div className="subsection-title">
          <div>
            <Globe />
          </div>
          <div>{t("MainPage.share.title")}</div>
          <div>
            <Globe />
          </div>
        </div>

        {copyMsg?.length > 0 && <div className="copy-msg">{copyMsg}</div>}

        <div className="btns">
          <li title={t("MainPage.share.btns.kakaotalk")}>
            <KakaoShareButton />
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
