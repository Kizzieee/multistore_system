import React from "react";

export default function renderErrorMessages(error) {
  if (!error) return null;

  return (
    <div className="alert alert-danger" role="alert">
      {Object.keys(error).map((fieldKey) =>
        error[fieldKey].map((message, index) => (
          <p key={`${fieldKey}-${index}`}>{message}</p>
        ))
      )}
    </div>
  );
}
