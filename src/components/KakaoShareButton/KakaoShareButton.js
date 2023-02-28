import {useTranslation} from "react-i18next";
import "./KakaoShareButton.css";

export default function KakaoShareButton({msg = {type: "page"}}) {
  const {t} = useTranslation();

  const resultShareMsg = {
    objectType: "feed",
    content: {
      title: `${t(
        "KakaoShareButton.message.resultShareMsg.content.title.line1"
      )} '${msg?.country || ""}'${t(
        "KakaoShareButton.message.resultShareMsg.content.title.line2"
      )}`,
      description: t(
        "KakaoShareButton.message.resultShareMsg.content.description"
      ),
      imageUrl: msg?.imageUrl || "",
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    },
    buttons: [
      {
        title: `'${msg?.country || ""}' ${t(
          "KakaoShareButton.message.resultShareMsg.buttons.button1.title"
        )}`,
        link: {
          mobileWebUrl: "https://mission-mbti.web.app/result?c=thai",
          webUrl: "https://mission-mbti.web.app/result?c=thai",
        },
      },
      {
        title: t(
          "KakaoShareButton.message.resultShareMsg.buttons.button2.title"
        ),
        link: {
          mobileWebUrl: "https://mission-mbti.web.app",
          webUrl: "https://mission-mbti.web.app",
        },
      },
    ],
  };

  const pageShareMsg = {
    objectType: "feed",
    content: {
      title: t("KakaoShareButton.message.pageShareMsg.content.title"),
      description: t(
        "KakaoShareButton.message.pageShareMsg.content.description"
      ),
      imageUrl:
        "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
    },
    buttons: [
      {
        title: t("KakaoShareButton.message.pageShareMsg.buttons.button1.title"),
        link: {
          mobileWebUrl: "https://mission-mbti.web.app",
          webUrl: "https://mission-mbti.web.app",
        },
      },
    ],
  };

  const share = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
      }

      if (msg?.type === "result") {
        kakao.Share.sendDefault(resultShareMsg);
      } else {
        kakao.Share.sendDefault(pageShareMsg);
      }
    }
  };

  return (
    <div id="KakaoShareButton" onClick={share}>
      <img
        src={require("../../assets/images/share_logos/kakaotalk.png")}
        alt={t("KakaoShareButton.shareToKakaotalk")}
      />
    </div>
  );
}
