import { useState } from "react";
import "./tabs.scss";
const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);

  return (
    <div className="tabs">
      <div className="tabs__header">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`tabs__tab${
              activeTab === tab.name ? " tabs__tab--active" : ""
            }`}
            onClick={() => setActiveTab(tab.name)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {tabs.map(
          (tab) =>
            activeTab === tab.name && (
              <div key={tab.name} className="tabs__panel">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
