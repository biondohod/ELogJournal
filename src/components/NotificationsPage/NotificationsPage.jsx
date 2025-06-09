import React from "react";
import { useNotifications } from "../../query/queries";
import { Link } from "react-router-dom";
import "./notificationsPage.scss";
import { useReadNotification } from "../../query/mutations";

const NotificationsPage = () => {
  const { data = [], isLoading } = useNotifications();
  const { mutateAsync: readNotification, isPending } = useReadNotification();

  const handleRead = async (id) => {
    await readNotification(id);
  };

  return (
    <div className="notifications-page">
      <h1 className="notifications-page__title">Уведомления</h1>
      <div className="notifications-page__list">
        {data.length === 0 && (
          <div className="notifications-page__empty">Нет уведомлений</div>
        )}
        {data.map((notif) => (
          <div className="notifications-page__item" key={notif.id}>
            <div className="notifications-page__header">{notif.title}</div>
            <div className="notifications-page__message">{notif.message}</div>
            <div className="notifications-page__actions">
              <Link
                to={`/facility/${notif.constructionSiteId}`}
                className="button button--blue"
              >
                К объекту
              </Link>
              <button
                className="button button--white"
                onClick={() => handleRead(notif.id)}
              >
                Прочитано
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
