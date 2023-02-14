import "./ResultPage.css";
import {useTranslation} from "react-i18next";
import qs from "qs";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {COUNTRY_LIST} from "../../assets/constants";

export default function ResultPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {c} = qs.parse(location?.search, {
    ignoreQueryPrefix: true,
  });

  const [copyMsg, setCopyMsg] = useState("");

  const shareToKakaotalk = () => {};

  const shareToLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyMsg("링크가 클립보드로 복사되었어요!");

    let timer = undefined;
    timer = setTimeout(() => {
      setCopyMsg("");
      if (timer) clearTimeout(timer);
    }, 2000);
  };

  const returnToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(c);
    if (!(c?.length > 0) || !COUNTRY_LIST?.includes(c)) {
      // 페이지 오류 처리
    }
  }, []);

  return (
    <div id="ResultPage" className="page">
      <div className="title">
        <div> 나의 찰떡 선교지는</div>
        <div className="country">{t(`ResultPage.countries.${c}`)}</div>
        <div>이예요</div>
      </div>

      <div className="info">
        <div>나라 이미지 / 지도</div>

        <div>나라 설명</div>
      </div>

      <div className="share">
        <h4>{t("ResultPage.share.title")}</h4>

        {copyMsg?.length > 0 && <div className="copy-msg">{copyMsg}</div>}

        {/* TODO : 버튼 클릭시 행동 */}
        <div className="btns">
          <li
            title={t("ResultPage.share.btns.kakaotalk")}
            onClick={shareToKakaotalk}
          >
            <img
              src={require("../../assets/images/share_logos/kakaotalk.png")}
              alt={t("ResultPage.share.btns.kakaotalk")}
            />
          </li>
          <li title={t("ResultPage.share.btns.link")} onClick={shareToLink}>
            <img
              src={require("../../assets/images/share_logos/link.png")}
              alt={t("ResultPage.share.btns.link")}
            />
          </li>
        </div>
      </div>

      <button type="button" className="home-btn" onClick={returnToHome}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
