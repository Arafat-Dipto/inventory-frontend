// import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import React, { useContext, useState } from 'react';
import Icon from '../Shared/Icon';
import { AuthContext } from '../context/AuthProvider';

const BottomHeader = () => {
  // const { auth } = usePage().props;
  const { currentUser, dispatch } = useContext(AuthContext);
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 d:text-md">
      <div className="mt-1 mr-4">{currentUser?.user?.name}</div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer select-none group"
          onClick={() => setMenuOpened(true)}
        >
          <div className="mr-1 text-gray-800 whitespace-nowrap group-hover:text-indigo-600 focus:text-indigo-600">
            <span>{currentUser?.user?.name}</span>
          </div>
          <Icon
            className="w-5 h-5 text-gray-800 fill-current group-hover:text-indigo-600 focus:text-indigo-600"
            name="cheveron-down"
          />
        </div>
        <div className={menuOpened ? '' : 'hidden'}>
          <div className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            <a
              // href={route('users.edit', auth.user.id)}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              My Profile
            </a>
            <a
              // href={route('users')}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              Manage Users
            </a>
            <a
              as="button"
              href="#"
              className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
              method="post"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Logout
            </a>
          </div>
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  );
};
export default BottomHeader;