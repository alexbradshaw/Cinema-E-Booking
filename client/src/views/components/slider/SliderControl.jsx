import React from "react";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify/icons-mdi/chevron-left";
import chevronRight from "@iconify/icons-mdi/chevron-right";
import './slidercontrol.css';


const SliderControl = ({ arrowDirection, onClick }) => {
  return (
    <div className={`slider-control ${arrowDirection}`}>
      <div className="slider-control-arrow" onClick={onClick}>
        <Icon icon={arrowDirection === "right" ? chevronRight : chevronLeft} />
      </div>
    </div>
  );
};

export default SliderControl;