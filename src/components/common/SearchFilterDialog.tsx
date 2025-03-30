interface SearchFilterDialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
}

export default function SearchFilterDialog({
  children,
  className = "",
  id = 'search-filter',
  ...props
}: SearchFilterDialogProps) {
  return (
    <dialog className={`modal-box ${className}`} id={id} {...props}>
      <form method='dialog'>
        <button
          type='submit'
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
          ✕
        </button>
      </form>
      {children}
    </dialog>
  );
}
