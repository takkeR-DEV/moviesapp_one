import React from 'react';
import { Tabs } from 'antd';

import './Header.scss';

const Header = (props) => {
  const { active, setActive } = props;
  const arr = [
    { label: 'Search', key: 'search' },
    { label: 'Rated', key: 'rated' },
  ];
  return (
    <div className="tabs">
      <Tabs items={arr} className="tabs__items" mode="horizontal" onChange={setActive} selectedkeys={active} />
    </div>
  );
};

export default Header;
