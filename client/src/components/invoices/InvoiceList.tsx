import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import api from '@/api/client';
import { type Invoice } from '@/types/invoice';
import InvoiceRow from './InvoiceRow';
import InvoiceModal from './InvoiceModal';

export default function InvoiceList() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const {
    data: invoices,
    isLoading,
    error,
  } = useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: async () => {
      const res = await api.get('/invoices');
      return res.data;
    },
  });

  if (isLoading) return <div>Loading invoices...</div>;
  if (error) return <div className="text-red-500">Failed to load invoices.</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-l-2xl shadow w-full">
      <table className="w-full border-collapse">
        <thead className="text-left text-gray-300 bg-slate-400 dark:bg-gray-800">
          <tr>
            <th className="py-4 px-3 border-b">
              <input type="checkbox" />
            </th>
            <th className="py-4 px-3 border-b">Date</th>
            <th className="py-4 px-3 border-b">Vendor</th>
            <th className="py-4 px-3 border-b">Description</th>
            <th className="py-4 px-3 border-b">Amount</th>
            <th className="py-4 px-3 border-b">Due Date</th>
            <th className="py-4 px-3 border-b">Paid</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-300">
          {invoices?.map((invoice, index) => (
            <InvoiceRow
              key={invoice.id}
              isLast={index === invoices.length - 1}
              invoice={invoice}
              onClick={setSelectedInvoice}
            />
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
}
