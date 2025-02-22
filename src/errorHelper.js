import React from "react";

export default function renderErrorMessages(error) {
  if (!error) return null;

  if (typeof error === "string") {
    return (
      <>
        <br />
        <div className="alert alert-danger" role="alert">
          <p>{error}</p>
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
            return <p key={fieldKey}>{messages}</p>;
          }

          if (Array.isArray(messages)) {
            return messages.map((message, index) => (
              <p key={`${fieldKey}-${index}`}>
                {fieldKey} : {message}
              </p>
            ));
          }

          return null;
        })}
      </div>
    </>
  );
}
