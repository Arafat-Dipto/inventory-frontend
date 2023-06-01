import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Shared/Icon';

const MainMenuItem = ({ icon, link, text }) => {
  const location = useLocation();
  const isActive = (location.pathname == link) ? true : false;

  const iconClasses = classNames('w-4 h-4 mr-2', {
    'text-white fill-current': isActive,
    'text-indigo-400 group-hover:text-white fill-current': !isActive
  });

  const textClasses = classNames({
    'text-white': isActive,
    'text-indigo-200 group-hover:text-white': !isActive
  });

  return (
    <div className="mb-4">
      <Link to={link} className="flex items-center group py-3">
        <Icon name={icon} className={iconClasses} />
        <div className={textClasses}>{text}</div>
      </Link>
    </div>
  );
};
export default MainMenuItem;