import React from 'react';
import { BellIcon, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border-b p-4 bg-white h-[10vh]">
      <div>
        <img src={'loginTitle'} alt="Logo" className="w-40" />
      </div>
      {/* <div className="flex items-center space-x-4 h-10">
        <Select>
          <SelectTrigger className="w-[300px] h-[400px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => navigate(`${APP.ROUTE.CHAT_WITH_ZIC}`)}
        >
          Zic-AI
        </Button>
      </div> */}
      <div className="flex items-center space-x-4 bg-slate-100 p-1 rounded-lg">
        <div className="flex items-center space-x-2 mr-0">
          <div className="bg-gray-300 rounded-full p-1 ml-2">
            <BellIcon size={20} />
          </div>
          <p>Welcome</p>
          {/* <div className="border-r-2 h-5" /> */}
        </div>
        {/* <DropdownMenuCheckboxes /> */}
      </div>
    </div>
  );
};

export default Header;
