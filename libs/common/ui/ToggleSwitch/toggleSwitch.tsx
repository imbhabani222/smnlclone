import React, { useState } from "react";
import { Switch } from "antd";

interface ToggleSwitchProps {
  checkedChildren: string;
  unCheckedChildren: String;
  checked: Boolean;
  onChange: (value: Boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checkedChildren,
  unCheckedChildren,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = (checked: boolean) => {
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <div>
      <Switch
        checked={isChecked}
        onChange={handleToggleChange}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
      <p>Toggle is {isChecked ? "on" : "off"}</p>
    </div>
  );
};

export default ToggleSwitch;
