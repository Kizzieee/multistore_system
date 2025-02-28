import { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { GlobalContext } from "./GlobalContext";

function MyToast() {
  const { toastData, setToastData } = useContext(GlobalContext);
  return (
    <>
      <div aria-live="polite" aria-atomic="true" style={{ minHeight: "240px" }}>
        <ToastContainer className="p-3" position="top-end">
          <Toast
            onClose={() => setToastData({ ...toastData, show: false })}
            show={toastData.show}
            delay={3000}
            autohide
            className={`bg-${toastData.severity}`}
          >
            <Toast.Header>
              <strong className="me-auto">{toastData.header}</strong>
            </Toast.Header>
            <Toast.Body>{toastData?.body}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      ;
    </>
  );
}

export default MyToast;
