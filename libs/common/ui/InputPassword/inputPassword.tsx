import React, { useState } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./inputPassword.module.scss";

interface InputPasswordProps {
  placeholder: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  error?: boolean;
  errorText?: string;
}

const InputPassword = (props: any) => {
  const {
    placeholder,
    autoComplete,
    onChange,
    error = false,
    errorText = "",
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passValue = e.target.value;
    setPassword(passValue);
    onChange(passValue);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <Input.Password
        className={styles.inputPassword}
        placeholder={placeholder}
        autoComplete={autoComplete}
        iconRender={(visible) =>
          visible ? (
            <EyeTwoTone onClick={handleTogglePasswordVisibility} />
          ) : (
            <EyeInvisibleOutlined onClick={handleTogglePasswordVisibility} />
          )
        }
        onChange={handlePasswordChange}
        {...props}
      />
      {error && password === "" && <div>{errorText}</div>}
    </div>
  );
};

export default InputPassword;
