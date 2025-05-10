import "./createPage.scss";
const CreatePage = () => {
  return (
    <div className="create">
      <p className="title">Создание объекта</p>
      <form className="create__form">
        <div className="create__input">
          <label htmlFor="name">
            Название объекта <sup>*</sup>
          </label>
          <input type="text" id="name" />
        </div>
        <div className="create__input">
          <label htmlFor="address">
            Адрес объекта <sup>*</sup>
          </label>
          <input type="text" id="address" />
        </div>
        <div className="create__input">
          <label htmlFor="description">Описание объекта</label>
          <textarea id="description"></textarea>
        </div>
        <button type="submit" className="button button--white">
          Добавить объект
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
