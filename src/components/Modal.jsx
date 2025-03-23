import React from "react";

const Modal = ({
  modalID,
  modalHeaderStyle,
  modalTitle,
  modalClosedBTNStyle,
  modalContentStyle,
  modalBodyStyle,
  modalBodyContent,
  modalFooterStyle,
  modalFooterContent,
  modalSize
}) => {

  return (
    <main className="modal fade" id={modalID}>
      <article className={`modal-dialog modal-dialog-centered ${modalSize}`}>
        <section className={`modal-content ${modalContentStyle}`}>
          <div className={`modal-header ${modalHeaderStyle}`}>
            {modalTitle}
            <button
              className={`btn-close ${modalClosedBTNStyle}`}
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className={`modal-body ${modalBodyStyle}`}>
            {modalBodyContent}
          </div>

          <div className={`modal-footer ${modalFooterStyle}`}>
            {modalFooterContent}
          </div>
        </section>
      </article>
    </main>
  );
};

export default Modal;
