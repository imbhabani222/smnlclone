import React from "react";
import { useLocation } from "react-router-dom";
import { HeaderNavigation } from "./payrollHeader/payrollHeader";
import { Panel } from "../../../../../libs/common/ui/Panel";
import { Payroll_Processing_Sub_Menu } from "./route";

const View = (props:any) => {

    const location = useLocation();
 
    const compt = () => {
        const comp: any = Payroll_Processing_Sub_Menu?.find((e:any)=> e?.path === location.pathname);
        return <comp.component />;
    }

    return (
        <div>
         <HeaderNavigation menus = {Payroll_Processing_Sub_Menu} />
            <div style={{margin:"15px 20px"}}>{compt()}</div>
        </div>
    )
}

export default View