import "./SurveyPage.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {scrollToTopFunc} from "../../hooks/ScrollToTop";
import {loadAllQuestions} from "../../hooks/firebase";
import {
  NO,
  NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE,
  YES,
} from "../../assets/constants";

export default function SurveyPage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState([0, 1]);
  const [answers, setAnswers] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");

  const checkAnswer = (qIndex, qAnswer) => {
    if (alertMsg?.length > 0) {
      setAlertMsg("");
    }

    let tmpAnswers = answers;
    tmpAnswers[qIndex] = tmpAnswers[qIndex] === qAnswer ? 0 : qAnswer;
    setAnswers([...tmpAnswers]);
  };

  const confirmAllQuestionChecked = () => {
    for (
      let i = NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE * (pageNumber[0] - 1);
      i < NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE * pageNumber[0];
      i++
    ) {
      if (answers[i] === 0) {
        console.log("There is no checked answer");
        setAlertMsg("모든 질문에 답변해주세요.");
        // 경고 메시지
        return false; // 체크 안된 답변 있음
      }
    }
    return true; // 체크 안됨 답변 없음
  };

  const nextPageOnClicked = () => {
    if (confirmAllQuestionChecked()) {
      setAlertMsg("");
      setPageNumber([pageNumber[0] + 1, pageNumber[1]]);
    }
  };

  const endPageOnClicked = () => {
    if (confirmAllQuestionChecked()) {
      navigate("/loadingResult", {
        state: answers,
      });
    }
  };

  useEffect(() => {
    scrollToTopFunc();
  }, [pageNumber]);

  useEffect(() => {
    loadAllQuestions()
      .then((r) => {
        setQuestions(r);

        let tmpAnswers = new Array(r.length);
        for (let i = 0; i < r.length; i++) {
          tmpAnswers[i] = 0;
        }
        setAnswers(tmpAnswers);
        setPageNumber([
          1,
          Math.ceil(r.length / NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE),
        ]);
      })
      .catch((e) => {
        console.error(e);
        // TODO : 질문 로딩 실패 페이지
        window.alert("질문을 불러오는데 실패하였습니다.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="SurveyPage" className="page">
      <div className="progress">
        <div className="title">진행률</div>
        <div className="bar">
          <li
            className="current"
            style={{width: `${((pageNumber[0] - 1) / pageNumber[1]) * 100}%`}}
          />
          <li className="all" />
        </div>
      </div>

      <ul className="questions">
        {questions?.length > 0 &&
          questions
            ?.slice(
              NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE * (pageNumber[0] - 1),
              Math.min(
                NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE * pageNumber[0],
                questions?.length
              )
            )
            .map((q, qIndex) => (
              <li className="q" key={q?.id || qIndex}>
                <div className="conts">{q?.q ?? ""}</div>

                <div className="btns">
                  <button
                    type="button"
                    className={
                      answers[
                        NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE *
                          (pageNumber[0] - 1) +
                          qIndex
                      ] === NO
                        ? "clicked"
                        : "no"
                    }
                    onClick={() =>
                      checkAnswer(
                        NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE *
                          (pageNumber[0] - 1) +
                          qIndex,
                        NO
                      )
                    }
                  >
                    아니다
                  </button>
                  <button
                    type="button"
                    className={
                      answers[
                        NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE *
                          (pageNumber[0] - 1) +
                          qIndex
                      ] === YES
                        ? "clicked"
                        : "yes"
                    }
                    onClick={() =>
                      checkAnswer(
                        NUM_OF_QUESTION_IN_A_PAGE_IN_SURVEY_PAGE *
                          (pageNumber[0] - 1) +
                          qIndex,
                        YES
                      )
                    }
                  >
                    그렇다
                  </button>
                </div>
              </li>
            ))}
      </ul>

      <div className="btns">
        {pageNumber[0] > 0 &&
          (pageNumber[0] < pageNumber[1] ? (
            <button
              type="button"
              className={alertMsg?.length > 0 ? "forbidden" : "next-btn"}
              onClick={nextPageOnClicked}
            >
              {alertMsg || "다음"}
            </button>
          ) : (
            <button
              type="button"
              className={alertMsg?.length > 0 ? "forbidden" : "end-btn"}
              onClick={endPageOnClicked}
            >
              {alertMsg || "완료"}
            </button>
          ))}
      </div>
    </div>
  );
}
