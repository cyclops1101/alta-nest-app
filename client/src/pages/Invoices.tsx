import Layout from '@/components/layout/Layout';
import InvoiceList from '@/components/invoices/InvoiceList';
import RequireAuth from '@/components/auth/RequireAuth.tsx';

export default function InvoicesPage() {
  return (
    <RequireAuth>
      <Layout>
        <InvoiceList />
      </Layout>
    </RequireAuth>
  );
}
