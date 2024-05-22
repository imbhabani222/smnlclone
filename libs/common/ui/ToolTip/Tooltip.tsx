import { Button, Tooltip } from "antd";
import React from "react";

type TooltipPlacement =
  | "topLeft"
  | "top"
  | "topRight"
  | "leftTop"
  | "left"
  | "leftBottom"
  | "rightTop"
  | "right"
  | "rightBottom"
  | "bottomLeft"
  | "bottom"
  | "bottomRight";
interface ToolTipType {
  title: string;
  placement?: TooltipPlacement;
}

const Tooltips: React.FC<ToolTipType> = ({ title, placement = "topLeft" }) => {
  return (
    <div>
      <Tooltip placement={placement} title={title}>
        <Button>Okay</Button>
      </Tooltip>
    </div>
  );
};

export default Tooltips;
