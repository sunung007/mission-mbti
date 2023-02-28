import "./ResultPage.css";
import {useTranslation} from "react-i18next";
import qs from "qs";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {COUNTRY_LIST} from "../../assets/constants";
import CountryGoogleMap from "./CountryGoogleMap";
import CrossIcon from "../../assets/images/cross.png";
import KakaoShareButton from "../../components/KakaoShareButton/KakaoShareButton";

export default function ResultPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {c} = qs.parse(location?.search, {
    ignoreQueryPrefix: true,
  });

  const [country, setCountry] = useState({
    name: "thai",
    nameLang: "태국",
    position: {
      lat: 15.34356248967479,
      lng: 100.7064977670962,
    },
    description: "동남아시아의 연결 통로", // TODO : DB -> 언어별로 설정
    mainImg: require("../../assets/images/country_main_images/thai.jpg"),
    mainImgUrl: "../../assets/images/country_main_images/thai.jpg",
    mapUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Thailand_on_the_globe_%28Asia_centered%29.svg",
    getherUrl: "https://app.gather.town/app/VYEVvurYdVLuQ8NF/Church",

    info: `<p>
      태국은 1년 내내 여름인 열대과일이 풍부한 나라예요!
      <br />
      일찍부터 프랑스와의 수교를 통해서 서구의 영향도 많이 받았어요.
      <br />
      산은 없지만 넓은 평지와 바다를 가지고 있어서 육류와 해산물도
      풍부하답니다!
      <br />
      특히 태국은 섬과 해변의 경치가 아주 아름다운 나라예요!
    </p>
    <p>
      태국어를 조금 못해도 괜찮아요. 관광산업으로 인해 영어를
      잘하거든요.
      <br />
      서쪽으로는 미얀마, 북쪽으로는 라오스, 동쪽으로는 캄보디아를 육로를
      통해서도 갈 수 있어요.
      <br />
      남쪽으로는 말레이시아와 싱가폴이 있고, 열차를 통해서도 갈 수
      있답니다!
      <br />
    </p>
    <p className="line-highlight">
      관광으로는 익숙한 태국! 선교로는 어떠세요?
    </p>`,
    pray: [
      "태국 땅의 복음 전파를 위해",
      "태국에 가계신 선교사님의 사역과 건강을 위해",
    ],
  });

  const [copyMsg, setCopyMsg] = useState("");

  const openGetherWindow = () => {
    window.alert("아직 준비되지 않은 기능이예요!");
  };

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

      <div className="body">
        <div className="cont1">
          <div className="description">{country?.description}</div>

          <div className="main-img">
            <img src={country?.mainImg} alt={country?.name} />
          </div>

          <div
            className="info"
            dangerouslySetInnerHTML={{__html: country?.info}}
          />

          <div className="map">
            <div className="world-map">
              <img
                src={country?.mapUrl}
                alt={country?.nameLang || country?.name}
              />
            </div>
            <div className="google-map">
              <CountryGoogleMap
                style={{
                  width: "100%",
                  height: "100%",
                }}
                center={country?.position}
                zoom={5}
              />
            </div>
          </div>
        </div>

        <div className="cont2">
          <div className="subsection-title">
            {country?.nameLang}을 위한 기도
          </div>
          {country?.pray?.map((p, pIndex) => (
            <li key={pIndex}>
              <img src={CrossIcon} className="list-icon" alt="" />
              {p}
            </li>
          ))}
        </div>

        <div className="cont3">
          <div className="subsection-title">
            충현교회의 {country?.nameLang} 동역교회
          </div>
          <button
            className="gether-btn"
            type="button"
            onClick={openGetherWindow}
          >
            게더타운으로 미리보기
          </button>
        </div>
      </div>

      <div className="share">
        <div className="subsection-title">{t("ResultPage.share.title")}</div>

        {copyMsg?.length > 0 && <div className="copy-msg">{copyMsg}</div>}

        <div className="btns">
          <li title={t("ResultPage.share.btns.kakaotalk")}>
            <KakaoShareButton
              msg={{
                type: "result",
                country: country?.nameLang,
                // TODO : 링크 DB 이미지로 변경
                imageUrl:
                  "http://www.choonghyunchurch.or.kr/user/saveDir/awd/T/0/subMainImg_460833_default.jpg?itemTime=1676960594",
              }}
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
