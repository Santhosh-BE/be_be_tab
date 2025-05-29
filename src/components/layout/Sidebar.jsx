import {
  Home,
  Upload,
  Images,
  MapPin,
  Link as LinkIcon,
  Tags,
  LogOut,
  User,
  Crop,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/upload', icon: Upload, label: 'Upload Media' },
  { path: '/gallery', icon: Images, label: 'View Gallery' },
  { path: '/manage-address', icon: MapPin, label: 'Manage Addresses' },
  { path: '/map-to-address', icon: LinkIcon, label: 'Crop to Address' },
  { path: '/media-to-content', icon: Tags, label: 'Media to Content' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo/Brand */}
      <div className="flex items-center h-16 px-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Crop className="h-4 w-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900">
            Media Manager
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <p
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                location === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </p>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-slate-300 text-slate-600">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {'User'}
            </p>
            <p className="text-xs text-slate-500">Logged in</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={false}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
