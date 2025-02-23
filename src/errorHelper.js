import React from "react";

export default function renderErrorMessages(error) {
  if (!error) return null;

  if (typeof error === "string") {
    return (
      <>
        <div className="alert alert-danger" role="alert">
          <span className="d-block">{error}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <br />
      <div className="alert alert-danger" role="alert">
        {Object.keys(error).map((fieldKey) => {
          const messages = error[fieldKey];

          if (typeof messages === "string") {
            return (
              <span className="d-block" key={fieldKey}>
                {messages}
              </span>
            );
          }

          if (Array.isArray(messages)) {
            return messages.map((message, index) => (
              <span className="d-block" key={`${fieldKey}-${index}`}>
                {fieldKey} : {message}
              </span>
            ));
          }

          return null;
        })}
      </div>
    </>
  );
}
