import React, { useEffect, useState } from "react";
import { getDocTypes, getTableData } from "../../../../../../libs/common/api/doctype";
import Table from "../../../../../../libs/common/ui/Table/SmnlTable";
type Props = {};

const View = (props: Props) => {
const [columns, setcolumns] = useState<any>([]);
const [data, setdata] = useState<any>([]);
useEffect(() => {
getDocTypes("Inventory User Master").then((items) => {
setcolumns(items)
});
getTableData("inventory_user_master","general_setup").then((items) => {
setdata(items)
});
}, []);

return (
<div>
<Table
column={columns}
dataSource={data}
editUrl="/create-user-master"
/>
</div>
);
};

export default View;
