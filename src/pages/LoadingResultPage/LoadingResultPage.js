import "./LoadingResultPage.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {
  COUNTRY_LIST,
  SHOW_TIME_A_COUNTRY_IN_LOADING_RESULT_PAGE,
} from "../../assets/constants";

export default function LoadingResultPage() {
  const {t} = useTranslation();
  const {state} = useLocation();
  const navigate = useNavigate();

  const moveToResult = (country) => {
    if (country) navigate(`/result?c=${country}`);
  };

  useEffect(() => {
    // state 비었을 떄 오류처리
    console.log("state");
    console.log(state);

    // 결과 계산
    let result = "japan";

    // 3초 뒤 결과 페이지로 전달/이동
    const timer = setTimeout(
      () => moveToResult(result),
      SHOW_TIME_A_COUNTRY_IN_LOADING_RESULT_PAGE * 12
    );
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="LoadingResultPage" className="page">
      <div className="cont">
        <div className="msg">
          {t("LoadingResultPage.msg.line1")}
          <br />
          {t("LoadingResultPage.msg.line2")}
        </div>

        <div className="img">
          <div className="circle">
            {COUNTRY_LIST?.map((c, cIndex) => (
              <img
                className="country-logo"
                src={require(`../../assets/images/round_country/${c}.png`)}
                alt={c}
                key={c || cIndex}
                style={{
                  animation: `scaleUp ${
                    SHOW_TIME_A_COUNTRY_IN_LOADING_RESULT_PAGE * 12
                  }ms ${
                    SHOW_TIME_A_COUNTRY_IN_LOADING_RESULT_PAGE * cIndex
                  }ms infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
