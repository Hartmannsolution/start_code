import {useState} from 'react';
import './tooltip.css';

const ToolTip = ({text,message}) => {
const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = () => {
    console.log('WE ARE HERE !!!!!!!');
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  return (
      <div className="parent" onMouseOver={handleMouseOver} onMouseOut={()=>setShowTooltip(false)}>
        <span>{text}</span>
       {showTooltip && <span className="mytooltip">{message?message:'No address for this user'}</span>}
      </div>
  );
}
export default ToolTip;