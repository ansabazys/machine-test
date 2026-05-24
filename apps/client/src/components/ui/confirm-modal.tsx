interface Props {
  open: boolean;

  title: string;

  description: string;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  onConfirm: () => void;

  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: Props) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md border border-[#e5e7eb] bg-white p-6 shadow-2xl">
        {/* LABEL */}
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">
          Confirmation
        </p>

        {/* TITLE */}
        <h2 className="mt-3 text-xl font-medium tracking-tight text-[#09090b]">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm leading-7 text-[#6b7280]">
          {description}
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              border border-[#e5e7eb]
              bg-white
              px-4 py-2
              text-xs font-mono uppercase tracking-widest
              text-[#6b7280]
              transition-colors
              hover:bg-[#f3f4f6]
              hover:text-[#09090b]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              border border-[#09090b]
              bg-[#09090b]
              px-4 py-2
              text-xs font-mono uppercase tracking-widest
              text-white
              transition-opacity
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Processing..."
              : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;