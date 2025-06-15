import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarIconMap, sidebarMenuItems } from '../../constants';

const Sidebar = ({ setExpand }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.link);
  };

  const handleHover = (isHovering) => {
    if (!isExpanded) {
      setIsHoverExpanded(isHovering);
    }
  };

  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    setExpand(newState);
  };

  // Set initial active item based on current route
  if (!activeItem) {
    const active = sidebarMenuItems.find((item) =>
      location.pathname.includes(item.link),
    );
    if (active) setActiveItem(active.name);
  }

  return (
    <div className="w-20 bg-gray-100 flex flex-col items-center py-4 space-y-6 z-20">
      <nav
        className={`
          bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0 mt-[10vh]
          duration-300 ease-in-out md:fixed md:translate-x-0 mt-[10vh]
          ${isExpanded ? 'w-64' : isHoverExpanded ? 'w-64 bg-slate-50/70 backdrop-blur-md' : 'w-20'}
        `}
      >
        <button
          className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
          onClick={toggleExpand}
        >
          <ChevronRight
            className={`h-4 w-4 transform ${isExpanded ? 'rotate-0' : 'rotate-180'} duration-500`}
          />
        </button>

        <div
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          className="relative h-full overflow-hidden"
        >
          <div className="text-slate-500 h-full">
            <div className="my-3 mb-10 p-0 h-full">
              <ul className="list-none text-sm font-normal px-3 flex flex-col h-full">
                {sidebarMenuItems.map((item, index) => (
                  <li
                    key={item.id}
                    className={index === 6 ? 'mt-auto mb-5' : ''}
                  >
                    <div
                      onClick={() => handleItemClick(item)}
                      className={`
                        group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1
                        pl-4
                        ${activeItem === item.name ? 'text-blue-600 font-semibold bg-blue-200/20' : 'text-slate-500 hover:bg-slate-300/20'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {sidebarIconMap[item.icon]}
                        <div
                          className={`truncate ${isExpanded || isHoverExpanded ? '' : 'w-0 h-0 opacity-0'}`}
                        >
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
