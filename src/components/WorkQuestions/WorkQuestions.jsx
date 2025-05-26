import { useState } from "react";
import { useAddWorkIssue, useAnswerWorkIssue } from "../../query/mutations";
import WorkQuestionsModal from "../WorkQuestionsModal/WorkQuestionsModal";
import { prettyDate } from "../../helpers/prettyDate";
import WorkAnswerModal from "../WorkAnswerModal/WorkAnswerModal";

const WorkQuestions = ({ issue, id }) => {
  console.log(issue);
  const [openModal, setOpenModal] = useState(null); // "question" | "answer" | null

  const { mutateAsync: addWorkIssue, isPending: isPendingQuestion } =
    useAddWorkIssue(id);
  const { mutateAsync: addAnswer, isPending: isPendingAnswer } =
    useAnswerWorkIssue(id);

  const onSubmitQuestion = async (data) => {
    try {
      const formattedData = {
        ...data,
        workIssueId: issue?.id,
        id: id,
      };
      await addWorkIssue(formattedData);
    } catch (error) {
      console.error("Ошибка при добавлении регистрационного листа:", error);
    }
  };

  const onSubmitAnswer = async (data) => {
    try {
      const formattedData = {
        ...data,
        id: id,
      };
      await addAnswer({ id: issue?.id, data: formattedData });
    } catch (error) {
      console.error("Ошибка при добавлении ответа на вопрос:", error);
    }
  };

  const handleOpenModal = (type) => {
    setOpenModal(type); // type: "question" или "answer"
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <div className="table__wrapper">
        <table className="table table--questions">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="table__head-row">
              <th className="table__header">Автор вопроса</th>
              <th className="table__header">Текст вопроса</th>
              <th className="table__header table__cell--center">
                Дата вопроса
              </th>
              <th className="table__header">Автор ответа</th>
              <th className="table__header">Текст ответа</th>
              <th className="table__header table__cell--center">Дата ответа</th>
            </tr>
          </thead>
          <tbody>
            {issue?.items?.length > 0 ? (
              issue.items.map((item) => (
                <tr className="table__row" key={item.id}>
                  <td className="table__cell">
                    {item.updateInfo?.createdByUserId || "-"}
                  </td>
                  <td className="table__cell">{item.question}</td>
                  <td className="table__cell table__cell--center">
                    {item.questionDate ? prettyDate(item.questionDate) : "-"}
                  </td>
                  <td className="table__cell">
                    {item.answer ? item.answerUserId || "-" : "-"}
                  </td>
                  <td className="table__cell">
                    {item.answer ? (
                      item.answer
                    ) : (
                      <button
                        className="button button--blue"
                        onClick={() => handleOpenModal("answer")}
                      >
                        Ответить на вопрос
                      </button>
                    )}
                  </td>
                  <td className="table__cell table__cell--center">
                    {item.answerDate ? prettyDate(item.answerDate) : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="table__cell" colSpan={6}>
                  Нет вопросов
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="button button--blue"
          onClick={() => handleOpenModal("question")}
        >
          Задать вопрос
        </button>
      </div>
      {openModal === "question" && (
        <WorkQuestionsModal
          isPending={isPendingQuestion}
          onClose={handleCloseModal}
          onSubmitProp={onSubmitQuestion}
        />
      )}
      {openModal === "answer" && (
        <WorkAnswerModal
          isPending={isPendingAnswer}
          onClose={handleCloseModal}
          onSubmitProp={onSubmitAnswer}
        />
      )}
    </>
  );
};

export default WorkQuestions;
