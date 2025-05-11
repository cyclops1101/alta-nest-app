import { type Invoice } from '@/types/invoice';

interface Props {
  invoice: Invoice;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, onClose }: Props) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the backdrop itself is clicked, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
        <p>
          <strong>Vendor:</strong> {invoice.vendor_name}
        </p>
        <p>
          <strong>Amount:</strong> ${invoice.amount.toFixed(2)}
        </p>
        <p>
          <strong>Due Date:</strong>{' '}
          {new Date(invoice.due_date).toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
          })}
        </p>
        <p>
          <strong>Description:</strong> {invoice.description}
        </p>
        <p>
          <strong>Paid:</strong> {invoice.paid ? 'Yes' : 'No'}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
