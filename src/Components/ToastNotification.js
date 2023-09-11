import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastNotification() {

  const toastInfo = () => toast.info('This is Toast Notification for Info');
  const toastSuccess = () => toast.success('This is Toast Notification for Success');
  const toastWarn = () => toast.warn('This is Toast Notification for Warn');
  const toastError = () => toast.error('This is Toast Notification for Error');

  return (
    <div className="App">
      <button className="btn" onClick={toastInfo}>Info</button>
      <button className="btn" onClick={toastSuccess}>Success</button>
      <button className="btn" onClick={toastWarn}>Warn</button>
      <button className="btn" onClick={toastError}>Error</button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
}
export default ToastNotification;