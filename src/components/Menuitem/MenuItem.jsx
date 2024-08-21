import React from 'react';

import './MenuItem.css';

const MenuItem = ({ name, price,currency }) => {
  return(
  <div className="app__menuitem">
    <div className="app__menuitem-head">
      <div className="app__menuitem-name">
        
        <p className="p__cormorant" style={{ color: '#DCCA87' }}>{name}</p>
      </div>
      <div className="app__menuitem-dash" />
      <div className="app__menuitem-price">
        <p className="p__cormorant">{currency}{price}</p>
      </div>
      <div>
      {currency}
      </div>
    </div>

    
  </div>
)};

export default MenuItem;