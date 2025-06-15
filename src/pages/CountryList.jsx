import { useState } from 'react';
import { CommonTable } from '../components/Table';
import { PencilLine, Trash2 } from 'lucide-react';
import {
  useDeleteCountryApiMutation,
  useGetCountryListApiQuery,
} from '../services/api/CountryApi';
import { useNavigate } from 'react-router-dom';
import { APP } from '../constants/AppVariables';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const CountryList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState();
  const countryListData = useGetCountryListApiQuery();
  const [deleteCountryApi, deleteCountryResponse] =
    useDeleteCountryApiMutation();

  const columns = [
    {
      accessorKey: '_id',
      header: 'ID',
    },
    {
      accessorKey: 'country',
      header: 'Country Name',
    },
    {
      accessorKey: 'countryCode',
      header: 'Country Code',
    },
    {
      accessorKey: 'Action',
      header: 'Action',
      cell: (cell) => {
        const id = cell.row.original._id;
        return (
          <div className="flex gap-2 cursor-pointer">
            <PencilLine
              color="#0F31AF"
              onClick={() => {
                navigate(`${APP.ROUTE.COUNTRY_FORM}?id=${id}`);
              }}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Trash2
                  size={20}
                  color="#FF001E"
                  onClick={() => setConfirmDelete(cell.row.original.country)}
                />
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px] bg-white"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
              >
                <DialogHeader>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this{' '}
                    <span className=" font-bold">{confirmDelete}</span>?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={() => deleteCountryApi({ id })}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
      size: 5,
    },
  ];
  console.log(confirmDelete, 'confirm');

  return (
    <div>
      <CommonTable
        columns={columns}
        data={countryListData?.data || []}
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
          navigate(APP.ROUTE.COUNTRY_FORM);
        }}
        isLoading={countryListData?.isLoading}
      />
    </div>
  );
};

export default CountryList;
