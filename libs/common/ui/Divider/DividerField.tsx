import { Divider } from "antd";
import React from "react";

interface DividersProps {
  type?: "horizontal" | "vertical";
  dashed?: boolean;
  orientation?: "left" | "right" | "center";
  style?: React.CSSProperties;
  className?: string;
}

const Dividers: React.FC<DividersProps> = (props) => {
  const { type, dashed, orientation, className, style } = props;

  return (
    <>
      <Divider
        type={type}
        dashed={dashed}
        orientation={orientation}
        style={style}
      />
    </>
  );
};

export default Dividers;
