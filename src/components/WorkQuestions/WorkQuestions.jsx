const WorkQuestions = () => {
  return (
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
            <th className="table__header table__cell--center">Дата вопроса</th>
            <th className="table__header">Автор ответа</th>
            <th className="table__header">Текст ответа</th>
            <th className="table__header table__cell--center">Дата ответа</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table__row">
            <td className="table__cell">Иванов Иван</td>
            <td className="table__cell">
              Текст текст текст Текст текст текст Текст текст текст
            </td>
            <td className="table__cell table__cell--center">01.01.2025</td>
            <td className="table__cell">Иванов Иван</td>
            <td className="table__cell">
              Текст текст текст Текст текст текст Текст текст текст Текст текст
              текст Текст текст текст Текст текст текст
            </td>
            <td className="table__cell table__cell--center">02.01.2025</td>
          </tr>
          <tr className="table__row">
            <td className="table__cell">Иванов Иван</td>
            <td className="table__cell">
              Текст текст текст Текст текст текст Текст текст текст
            </td>
            <td className="table__cell table__cell--center">01.01.2025</td>
            <td className="table__cell">-</td>
            <td className="table__cell">
              <button className="button button--blue">
                Ответить на вопрос
              </button>
            </td>
            <td className="table__cell table__cell--center">-</td>
          </tr>
        </tbody>
      </table>
      <button className="button button--blue">Задать вопрос</button>
    </div>
  );
};

export default WorkQuestions;
