import React from "react";
import { Select, Space } from "antd";

const handleChange = (value: string) => {};

const App: React.FC = () => (
  <Select
    defaultValue="lucy"
    style={{ width: 120 }}
    onChange={handleChange}
    options={[
      { value: "jack", label: "Jack" },
      { value: "lucy", label: "Lucy" },
      { value: "Yiminghe", label: "yiminghe" },
      { value: "disabled", label: "Disabled", disabled: true },
    ]}
  />
);

export default App;
