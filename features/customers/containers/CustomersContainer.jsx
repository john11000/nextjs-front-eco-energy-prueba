import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetCustomers from "../hooks/useGetCustomers";

export default function CustomersContainer() {
  const router = useRouter();
  const { getCustomers } = useGetCustomers();
  const [customersData, setCustomersData] = React.useState([]);

  useEffect(() => {
    (async () => {
      const customers = await getCustomers();
      if (customers) {
        setCustomersData(customers);
      }
    })();
  }, []);

  const handleViewInfo = (id) => {
    router.push(`/?client-id=${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
        Energy Customers
      </h1>

      <table className="min-w-full bg-black text-white border border-gray-700 rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs leading-4 font-medium text-green-400 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 border-b border-gray-700 bg-gray-900 text-left text-xs leading-4 font-medium text-green-400 uppercase tracking-wider">
              Customers
            </th>
            <th className="px-6 py-3 border-b border-gray-700 bg-gray-900"></th>
          </tr>
        </thead>
        <tbody>
          {customersData &&
            customersData.map((customer, index) => (
              <tr key={customer.index}>
                <td className="px-6 py-4 border-b border-gray-700">{index}</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {customer.customers}
                </td>
                <td className="px-6 py-4 border-b border-gray-700 text-right">
                  <button
                    onClick={() => handleViewInfo(customer.customers)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    View Info
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
