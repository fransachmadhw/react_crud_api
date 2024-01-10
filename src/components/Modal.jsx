import React from 'react';

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-center items-center xl:items-start 2xl:items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        modal
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
          {/* CONTENT */}
          <div
            className={`
            translate
            duration-300
            h-full
            ${props.isOpen ? 'translate-y-0' : 'translate-y-full'}
            ${props.isOpen ? 'opacity-100' : 'opacity-0'}
            `}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
