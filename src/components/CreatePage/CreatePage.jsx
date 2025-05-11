import "./createPage.scss";
const CreatePage = () => {
  return (
    <div className="create">
      <p className="title">Создание объекта</p>
      <form className="create__form">
        <div className="create__input">
          <label htmlFor="name" className="create__label">
            Название объекта <sup>*</sup>
          </label>
          <input type="text" id="name" className="create__input-field" />
        </div>
        <div className="create__input">
          <label htmlFor="address" className="create__label">
            Адрес объекта <sup>*</sup>
          </label>
          <input type="text" id="address" className="create__input-field" />
        </div>
        <div className="create__input">
          <label htmlFor="description" className="create__label">
            Описание объекта
          </label>
          <textarea id="description" className="create__textarea"></textarea>
        </div>
        <button type="submit" className="button button--white">
          Добавить объект
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
