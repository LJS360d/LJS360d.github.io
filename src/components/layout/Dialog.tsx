import { type ReactNode, useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';

interface DialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Dialog({ children, isOpen, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  // Prevent the dialog from closing on click inside the dialog
  const handleDialogClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <dialog
      ref={dialogRef}
      className='rounded-lg shadow-lg p-5 relative bg-base-100'
      onClick={onClose}>
      <div
        className='absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-600'
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
        <button type='button'>
          <MdClose size='24' />
        </button>
      </div>
      <div onClick={handleDialogClick} className='p-4'>
        {children}
      </div>
    </dialog>
  );
}
