import { type Invoice } from '@/types/invoice';

interface Props {
  invoice: Invoice;
  isLast: boolean;
  onClick: (invoice: Invoice) => void;
}

export default function InvoiceRow({ invoice, onClick, isLast }: Props) {
  return (
    <tr
      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
        isLast ? '' : 'border-b'
      }`}
      onClick={() => onClick(invoice)}
    >
      <td className="py-4 px-3 cursor-default" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" />
      </td>
      <td className="py-4 px-3">
        {new Date(invoice.due_date).toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })}
      </td>
      <td className="py-4 px-3">{invoice.vendor_name}</td>
      <td className="py-4 px-3">{invoice.description}</td>
      <td className="py-4 px-3">${invoice.amount.toFixed(2)}</td>
      <td className="py-4 px-3">{new Date(invoice.due_date).toLocaleDateString()}</td>
      <td className="py-4 px-3">{invoice.paid ? 'Paid' : 'Open'}</td>
    </tr>
  );
}
