import React, { useState, useRef, useEffect } from "react";
import { useOrganizations } from "../../query/queries";

const OrganizationSelect = ({
  value,
  onChange,
  placeholder = "Выберите организацию",
  disabled = false,
  name,
  required = false,
  style = {},
  className = "",
}) => {
  const { data: organizations = [] } = useOrganizations();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  // Закрытие дропдауна при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const filtered = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOrg = organizations.find((org) => org.id === value);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width: "100%", ...style }}
    >
      <div
        style={{
          background: "#c4c4c4",
          borderRadius: 5,
          padding: "10px 16px",
          cursor: disabled ? "not-allowed" : "pointer",
          minHeight: 40,
          opacity: disabled ? 0.6 : 1,
        }}
        onClick={() => !disabled && setDropdownOpen((v) => !v)}
        tabIndex={0}
      >
        {selectedOrg ? selectedOrg.name : placeholder}
      </div>
      {dropdownOpen && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #c4c4c4",
            borderRadius: 5,
            zIndex: 10,
            maxHeight: 180,
            overflowY: "auto",
            marginTop: 2,
          }}
        >
          <input
            type="text"
            autoFocus
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "none",
              borderBottom: "1px solid #eee",
              outline: "none",
              fontSize: 15,
              background: "#f5f5f5",
              borderRadius: "5px 5px 0 0",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {filtered.map((org) => (
            <div
              key={org.id}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                background: value === org.id ? "#e8e8e8" : "transparent",
              }}
              onClick={() => {
                onChange(org.id);
                setDropdownOpen(false);
              }}
            >
              {org.name}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "8px 16px", color: "#aaa" }}>Не найдено</div>
          )}
        </div>
      )}
      {/* Для интеграции с формами */}
      <input
        type="hidden"
        name={name}
        value={value || ""}
        required={required}
        readOnly
      />
    </div>
  );
};

export default OrganizationSelect;
