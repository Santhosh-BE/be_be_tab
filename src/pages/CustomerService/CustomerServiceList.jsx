import { useState } from 'react';
import { CommonTable } from '../../components/Table';
import { PencilLine, Trash2 } from 'lucide-react';
import { useGetCountryListApiQuery } from '../../services/api/CountryApi';
import { useNavigate } from 'react-router-dom';
import { APP } from '../../constants/AppVariables';
import { useGetCustomerListApiQuery } from '../../services/api/CustomerServiceApi';

const CustomerServiceList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState([]);
  const customerListData = useGetCustomerListApiQuery();
  console.log(customerListData, '<<<<Country List Data');

  const columns = [
    {
      accessorKey: '_id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Customer Name',
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
    },
    {
      accessorKey: 'Action',
      header: 'Action',
      cell: (cell) => {
        return (
          <div className="flex gap-2">
            <PencilLine
              color="#0F31AF"
              onClick={() => {
                navigate(
                  `${APP.ROUTE.CUSTOMER_SERVICE_FORM}?id=${cell.row.original._id}`,
                );
              }}
            />
            <Trash2 size={20} color="#FF001E" />
          </div>
        );
      },
      size: 5,
    },
  ];

  return (
    <div>
      <CommonTable
        columns={columns}
        data={customerListData.data || []}
        page={page}
        pageSize={pageSize}
        total={0}
        searchEnabled={true}
        searchValue={search}
        onSearchChange={setSearch}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sorting={sorting}
        onSortingChange={setSorting}
        addEnabled={true}
        handleAddClick={() => {
          navigate(APP.ROUTE.CUSTOMER_SERVICE_FORM);
        }}
        isLoading={customerListData?.isLoading}
      />
    </div>
  );
};

export default CustomerServiceList;
