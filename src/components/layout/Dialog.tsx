import { createEffect, type JSXElement } from 'solid-js';
import MdiClose from '~icons/mdi/close';

interface DialogProps {
  children: string | JSXElement;
  isOpen: boolean;
  onClose: () => void;
}

export default function Dialog({ children, isOpen, onClose }: DialogProps) {
  let dialogRef: HTMLDialogElement | undefined;

  createEffect(() => {
    if (isOpen) {
      dialogRef?.showModal();
    } else {
      dialogRef?.close();
    }
  });

  // Prevent the dialog from closing on click inside the dialog
  const handleDialogClick = (e: MouseEvent) => e.stopPropagation();

  return (
    <dialog
      ref={dialogRef}
      class='rounded-lg shadow-lg p-5 relative bg-base-100'
      onClick={onClose}>
      <div
        class='absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600'
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
        <button type='button'>
          <MdiClose size='24' />
        </button>
      </div>
      <div onClick={handleDialogClick} class='p-4'>
        {children}
      </div>
    </dialog>
  );
}

