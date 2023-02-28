import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {COUNTRY_LIST} from "../../../assets/constants";
import {loadAllQuestions, saveAllQuestions} from "../../../hooks/firebase";
import "./QuestionManagePage.css";

export default function QuestionManagePage() {
  const {t} = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [deletedQuestionId, setDeletedQuestionId] = useState(new Set());

  const loadQuestions = () => {
    loadAllQuestions()
      .then((r) => {
        setQuestions(r);
      })
      .catch((e) => {
        console.error(e);
        window.alert(
          t("QuestionManagePage.functionMessage.loadQuestions.error")
        );
      });
  };

  const addOnClick = () => {
    setQuestions([
      ...questions,
      {
        id: -1,
        q: "",
        result: {},
      },
    ]);
  };

  const saveOnClick = () => {
    saveAllQuestions(questions, deletedQuestionId)
      .then(() => {
        window.alert(t("QuestionManagePage.functionMessage.save.success"));
        loadQuestions();
      })
      .catch((e) => {
        console.error(e);
        window.alert(t("QuestionManagePage.functionMessage.save.fail"));
      });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div id="QuestionManagePage" className="page">
      <div className="title">
        <div className="text">{t("QuestionManagePage.title.text")}</div>
        <div className="btns">
          <button type="button" onClick={loadQuestions}>
            {t("QuestionManagePage.title.btns.toOrigin")}
          </button>
          <button type="button" onClick={addOnClick}>
            {t("QuestionManagePage.title.btns.add")}
          </button>
          <button type="button" onClick={saveOnClick}>
            {t("QuestionManagePage.title.btns.save")}
          </button>
        </div>
      </div>

      <div className="table">
        <li className="table-index">
          <div className="q-id" />
          <div className="q-cont" />
          {COUNTRY_LIST.map((cname) => (
            <div className="q-val" key={cname}>
              {t(`QuestionManagePage.countries.${cname}`)}
            </div>
          ))}
          <div className="q-del" />
        </li>

        {questions.map((q, qIndex) => (
          <li
            key={
              typeof q?.id === "number" && q?.id > -1
                ? q?.id
                : questions
                    ?.map((e) => e?.id || -1)
                    ?.reduce((previous, current) =>
                      previous > current ? previous : current
                    ) + qIndex
            }
            className="q"
          >
            <div className="q-id">{q?.id}</div>
            <div className="q-cont">
              <input
                type="text"
                className="q-cont-input"
                value={q?.q}
                onChange={(e) => {
                  q["q"] = e.target.value;
                  setQuestions([...questions]);
                }}
              />
            </div>
            {COUNTRY_LIST.map((cname) => (
              <div className="q-val" key={cname}>
                <input
                  type="number"
                  value={
                    q?.result?.hasOwnProperty(cname) && typeof q?.result[cname]
                      ? q?.result[cname]
                      : 0
                  }
                  onChange={(e) => {
                    q["result"][cname] = parseInt(`${e.target.value}`);
                    setQuestions([...questions]);
                  }}
                />
              </div>
            ))}

            <div className="q-del">
              <button
                type="button"
                onClick={() => {
                  if (q?.id > -1) {
                    deletedQuestionId.add(q?.id);
                    setDeletedQuestionId(deletedQuestionId);
                  }

                  questions.splice(qIndex, 1);
                  setQuestions([...questions]);
                }}
              >
                {t("QuestionManagePage.table.delRow.delButton")}
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
