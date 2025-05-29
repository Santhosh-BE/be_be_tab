import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Plus,
  Search,
  MapPin,
  Building,
  Home,
  Edit,
  Trash2,
  Images,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { APP } from '../constants/AppVariables';

export default function ManageAddresses() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const addresses = [];
  const photoMappings = [];
  const filteredAddresses =
    addresses?.filter(
      (address) =>
        address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.city.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const getPhotoCount = (addressId) => {
    return (
      photoMappings?.filter((mapping) => mapping.addressId === addressId)
        .length || 0
    );
  };

  const getAddressIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'residential':
        return <Home className="h-5 w-5" />;
      case 'commercial':
      case 'office':
        return <Building className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getIconColor = (type) => {
    switch (type.toLowerCase()) {
      case 'residential':
        return 'text-purple-600 bg-purple-100';
      case 'commercial':
      case 'office':
        return 'text-amber-600 bg-amber-100';
      case 'park':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this address?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Manage Addresses
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Add, edit, and organize your locations
              </p>
            </div>
            <Button onClick={() => navigate(APP.ROUTE.ADDRESS_FORM)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </div>

          {/* Search and Address List */}
          <Card>
            <CardContent className="p-0">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-slate-900">
                    Saved Addresses
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search addresses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {filteredAddresses.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <MapPin className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      {searchTerm ? 'No addresses found' : 'No addresses yet'}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {searchTerm
                        ? 'Try adjusting your search term'
                        : 'Add your first address to get started'}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => navigate(APP.ROUTE.ADDRESS_FORM)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Address
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredAddresses.map((address) => (
                    <div
                      key={address.id}
                      className="px-6 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center ${getIconColor(address.type)}`}
                          >
                            {getAddressIcon(address.type)}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-900">
                              {address.name}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {address.street}, {address.city}, {address.state}{' '}
                              {address.zip}
                            </p>
                            <div className="flex items-center mt-1 space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {address.type}
                              </Badge>
                              {address.notes && (
                                <Badge variant="outline" className="text-xs">
                                  Has notes
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            <Images className="mr-1 h-3 w-3" />
                            {getPhotoCount(address.id)} photos
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(address)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(address.id)}
                            disabled={deleteMutation.isPending}
                            className="text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
