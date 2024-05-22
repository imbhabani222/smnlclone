import axios from 'axios';
import { getSelectboxLabel } from '../utils/common';
import Cookies from 'universal-cookie';

const API_PATH = process.env.REACT_APP_API_SERVER;

const cookies = new Cookies();
const token = cookies.get('token');

const headers = {
  'Content-Type': 'application/json',
  Authorization: token,
  // token,
};
console.log(headers, "heades")

function getOptions(e: any) {
  if (e) {
    const optionsdata: any = [];
    e?.split('\n').map((items: any) =>
      optionsdata.push({ label: items, value: items })
    );
    return optionsdata;
  }
  return null;
}
export const getLinkValue = async (
  e: string,
  i: any,
  appname: string,
  filters?: any
) => {
  const data: any = [];
  if (e) {
    // console.log(e, i?.appname, i);
    const doctype = e.toLowerCase().split(' ').join('_');
    const modules: any = i;

    // console.log(
    //   modules?.appname,
    //   `${API_PATH}api/method/${modules?.appname || appname}.${
    //     modules?.modulename || modules?.module_name
    //   }.doctype.${doctype}.api.get_records`
    // );
    const filter = filters ? { ...filters } : null;
    await axios
      .get(
        `${API_PATH}api/method/${modules?.appname || appname}.${
          modules?.modulename || modules?.module_name
        }.doctype.${doctype}.api.get_records`,
        {
          headers: headers,
          params: {
            filters: filters || null,
          },
        }
      )
      .then(function (response: any) {
        const arr: any = response?.data?.message?.data || [];
        if (arr && arr?.length > 0)
          arr?.map((items: any) => {
            data.push({
              label: items[modules?.linkfield],
              value: items[modules?.optionValueName] || items?.name,
            });
          });
      })
      .catch(function (error) {
        return error;
      });
  }
  return data;
};

export const getDocTypes = async (
  doctype: any,
  isActive?: any,
  appname?: string
) => {
  const data: any = [];
  await axios
    .get(`${API_PATH}api/method/${appname}.api.get_fields?doctype=${doctype}`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success

      response?.data?.message?.data?.map((items: any) => {
        let description = {};
        try {
          if (items?.description) {
            description = JSON.parse(items?.description);
          }
        } catch (error) {
          console.log(error);
        }
        items?.fieldtype !== 'Column Break' &&
          data.push({
            title:
              items?.label === 'Active'
                ? 'Status'
                : items?.label === 'Upload Document' ||
                  items?.fieldname === 'upload_doc'
                ? 'Document'
                : items?.label,
            dataIndex: items?.fieldname,
            key: items?.fieldname,
            description: { ...description },
          });
      });
      if (!isActive) {
        data.push({
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          fixed: 'right',
        });
      }
    })
    .catch(function (error) {
      // handle error

      return error;
    });
  return data;
};

export const getTableData = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_records`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.data);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getEmployeeData = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_all_employee_data`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.data);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getPoCancel = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_po_cancel`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.data);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getRecordById = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_records_by_id`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const deleteRecordById = async (
  doctype: any,
  module: string,
  appname?: string,
  name?: string
) => {
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.delete_record?name=${name}`
    )
    .then(function (response: any) {
      return response?.data?.message;
    })
    .catch(function (error) {
      return error;
    });
  return data;
};

export const getRecordsById = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_record_by_id`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getProducts = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_po_products_by_id`,
      {
        data: { ...value },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getProductsList = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_products_list`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getProductsByList = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_product_by_list`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getFields = async (doctype: any, appname?: string) => {
  const data: any = [];
  await axios
    .get(`${API_PATH}api/method/${appname}.api.get_fields?doctype=${doctype}`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success
      response?.data?.message?.data?.map((items: any) => {
        let description = {};
        try {
          if (items?.description) {
            description = JSON.parse(items?.description);
          }
        } catch (error) {
          console.log(error);
        }

        data.push({
          label: items?.label,
          name: items?.fieldname,
          datatype: items?.fieldtype,
          isReq: items?.reqd === 1 || false,
          description: description,
          default: items?.default,
          options:
            items?.fieldtype === 'Select'
              ? getOptions(items?.options)
              : items?.options,
          hidden: items?.hidden,
          depends_on: items?.depends_on,
          readonly: items?.read_only === 1 || false,
        });
      });
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const createRecord = async (
  doctype: any,
  records: {},
  module?: string,
  appname?: string
) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.create_record`,
      {
        data: { ...records },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success

      data = response?.data?.message;
      // response?.data?.message?.fields?.map((items: any) =>
      //   data.push({
      //     label: items?.label,
      //     name: items?.fieldname,
      //     datatype: items?.datatype,
      //     options: null,
      //   })
      // );
    })
    .catch(function (error) {
      data =
        error?.response?.data?._server_messages ||
        error?.response?.data?.message;
    });
  return data;
};

export const updateRecord = async (
  doctype: any,
  records: {},
  module = 'master_data',
  appname?: string
) => {
  let data = {};
  await axios
    .put(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.update_record`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const getRoles = async (appname?: string) => {
  const data: any = [];
  await axios
    .get(`${API_PATH}api/method/${appname}.api.get_roles`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success
      response?.data?.message?.data?.map((items: any) =>
        data.push({
          ...items,
        })
      );
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const createRoles = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.create_role`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      data = error?.response?.data?.message;
    });
  return data;
};

export const updateRoles = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.update_role`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      data = error?.response?.data?.message;
    });
  return data;
};

export const getRolesById = async (value: any, appname?: string) => {
  // const data: any = [];
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.api.get_roles_by_id`, {
      headers: headers,
      params: value,
    })
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data?.[0];
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getPermissions = async (appname?: string) => {
  const data: any = [];
  await axios
    .get(`${API_PATH}api/method/${appname}.api.get_permissions`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success
      response?.data?.message?.roles?.map((items: any) =>
        data.push({
          ...items,
        })
      );
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const createPermissions = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.add_permissions`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error

      return error;
    });
  return data;
};

export const updatePermissions = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.update_permission`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error

      return error;
    });
  return data;
};

export const getPermissionsByRoles = async (value: any, appname?: string) => {
  // const data: any = [];
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.api.get_permissions`, {
      headers: headers,
      params: value,
    })
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getUsers = async (appname?: string) => {
  const data: any = [];
  await axios
    .get(`${API_PATH}api/method/${appname}.api.get_users?app_name=hrms`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success'
      response?.data?.message?.data?.map((items: any) =>
        data.push({
          ...items,
        })
      );
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const createUsers = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.create_user`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      data =
        error?.response?.data?._server_messages ||
        error?.response?.data?.message;
    });
  return data;
};

export const getUsersById = async (value: any, appname?: string) => {
  // const data: any = [];
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.api.get_user_by_id`, {
      headers: headers,
      params: value,
    })
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const updateUsers = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.update_user`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error

      return error;
    });
  return data;
};

export const getPermissionsDocTypes = async (appname?: string) => {
  let data: any = [];
  await axios
    .get(`${API_PATH}api/method/htssuite.api.get_all_doctypes`, {
      headers: headers,
      params: {
        app_name: appname,
      },
    })
    .then(function (response: any) {
      // handle success'
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getEmployeeById = async (value: any, appname?: string) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.employee_management.doctype.personal_details.api.get_records_by_id`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getAllModules = async (appname?: string) => {
  let data: any = [];
  await axios
    .get(`${API_PATH}api/method/htssuite.api.get_all_modules`, {
      headers: headers,
      params: {
        app_name: appname,
      },
    })
    .then(function (response: any) {
      // handle success'
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const blockModuleToUser = async (records: {}, appname?: string) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.api.block_modules_to_user`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error

      return error;
    });
  return data;
};

export const getBlockedModulesFormUser = async (
  value: any,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.api.get_blocked_modules_from_user`, {
      headers: headers,
      params: { userid: value },
    })
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const uploadImage = async (
  doctype: any,
  records: {},
  module = 'master_data',
  appname?: string
) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.upload_document`,
      {
        data: { ...records },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
      // response?.data?.message?.fields?.map((items: any) =>
      //   data.push({
      //     label: items?.label,
      //     name: items?.fieldname,
      //     datatype: items?.datatype,
      //     options: null,
      //   })
      // );
    })
    .catch(function (error) {
      // handle error

      return error;
    });
  return data;
};

export const getLeaveCountAndBalance = async (
  value: any,
  endPoint: string,
  appname?: string
) => {
  let data = {};
  // const data: any = [];
  await axios
    .get(`${API_PATH}api/method/${appname}.leave_management.api.${endPoint}`, {
      headers: headers,
      params: value,
    })
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      data = error?.response?.data?.message;
    });
  return data;
};

export const createRecords = async (
  doctype: any,
  records: {},
  module?: string,
  appname?: string
) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.create_records`,
      {
        data: { ...records },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success

      data = response?.data?.message;
      // response?.data?.message?.fields?.map((items: any) =>
      //   data.push({
      //     label: items?.label,
      //     name: items?.fieldname,
      //     datatype: items?.datatype,
      //     options: null,
      //   })
      // );
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const updateRecords = async (
  doctype: any,
  records: {},
  module = 'master_data',
  appname?: string
) => {
  let data = {};
  await axios
    .put(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.update_records`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const getTableDatasAndId = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  let data: any = {};

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_records`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      data = error?.response?.data?.message;
      return error;
    });
  return data;
};

export const getSupplierLocation = async (
  value: any,
  appname?: string,
  endPoint?: string
) => {
  const params = {
    filters: JSON.stringify({ supplier: value, active: 1 }),
  };
  const data = await axios
    .get(
      `${API_PATH}/api/method/${appname}.inventory_general_setup.doctype.inventory_supplier_location_master.api.get_records`,
      {
        headers: headers,
        params,
      }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getIssuedToName = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  const data = await axios
    .get(
      // `${API_PATH}/api/method/${appname}.inventory_general_setup.doctype.inventory_supplier_location_master.api.get_records`,
      // {
      //   headers: headers,
      //   params,
      // }
      `${API_PATH}/api/method/${appname}.${module}.doctype.${doctype}.api.issue_section?request_no=${value}`,
      { headers: headers }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSupplierGRN = async (
  value: any,
  appname?: string,
  endPoint?: string
) => {
  const params = {
    filters: JSON.stringify({ supplier: value }),
  };
  const data = await axios
    .get(
      `${API_PATH}/api/method/${appname}.inventory_management.doctype.inventory_good_received_note.api.get_records`,
      {
        headers: headers,
        params,
      }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSupplierGRNReturn = async (
  value: any,
  appname?: string,
  endPoint?: string
) => {
  const params = {
    filters: JSON.stringify({ supplier: value }),
  };
  const data = await axios
    .get(
      `${API_PATH}/api/method/${appname}.inventory_management.doctype.inventory_grn_return.api.get_records`,
      // http://127.0.0.1:8000/api/method/htsinventory.inventory_management.doctype.inventory_grn_return.api.get_records
      {
        headers: headers,
        params,
      }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getProductPurchcaseReturn = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_product?name=${value}`,
      {
        headers: headers,
        // params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getPIRecordById = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_records_by_id?name=${value}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getProductById = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_product?name=${value}`,
      {
        headers: headers,
        // params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSalaryProcessing = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.process_salary`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      return error;
    });
  return data;
};

export const deleteSalaryProcessing = async (
  doctype: any,
  params: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .delete(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.delete_records`,
      {
        headers: headers,
        params: params,
      }
    )
    .then(function (response: any) {
      return response?.data?.message;
    })
    .catch(function (error) {
      return error;
    });
  return data;
};

export const ChangePassword = async (module: string, value: any) => {
  // const data: any = [];
  const data = await axios
    .delete(`${API_PATH}api/method/${module}.api.change_password`, {
      data: { ...value },
    })
    .then(function (response: any) {
      return response?.data?.message;
    })
    .catch(function (error) {
      return error;
    });
  return data;
};

export const getPartReturnProduct = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_part_return_products`,
      {
        data: { ...value },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getReportsData = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  let data: any = [];

  await axios
    .get(`${API_PATH}api/method/${appname}.${module}.api.${doctype}`, {
      headers: headers,
      params: {
        filters: filters || null,
      },
    })
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const getAttendanceReportsData = async (
  doctype: any,
  module: string,
  appname?: string,
  from_date?: any,
  to_date?: any,
  emp_code?: any
) => {
  let data: any = [];

  await axios
    .get(`${API_PATH}api/method/${appname}.${module}.api.${doctype}`, {
      headers: headers,
      params: {
        from_date: from_date || null,
        to_date: to_date || null,
        emp_code: emp_code || null,
      },
    })
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const getReportsDataOnValue = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any,
  value?: any
) => {
  let data: any = [];

  await axios
    .get(`${API_PATH}api/method/${appname}.${module}.api.${doctype}`, {
      headers: headers,
      params: {
        filters: filters || null,
        value: value || null,
      },
    })
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const getAccountReports = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.reports.${doctype}`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.data);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getAccountReportsBalance = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  let data: any = {};

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.reports.${doctype}`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data = { ...response?.data?.message };
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getInventoryReports = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  let data: any = [];

  await axios
    .get(`${API_PATH}api/method/${appname}.${module}.api.${doctype}`, {
      headers: headers,
      params: {
        filters: filters || null,
      },
    })
    .then(function (response: any) {
      // handle success
      if (doctype === 'stock_report') {
        data = response?.data?.message;
      } else {
        data = { ...response?.data?.message };
      }
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const getFuelReports = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any,
  type?: any,
  page?: any,
  page_length?: any
) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.${type}`,
      {
        headers: headers,
        params: {
          filters: filters || null,
          page: page || null,
          page_length: page_length || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getGrnProducts = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  // const data: any = [];
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.grn_return_products`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getTableDataWithPagination = async (
  doctype: any,
  module: string,
  currentPage: number,
  page_length: number,
  appname?: string,
  filters?: any,
  searchParams?: any,
  order_by?: any
) => {
  try {
    const params =
      filters || searchParams
        ? {
            page: currentPage,
            page_length: page_length,
            filters: filters || null,
            ...(searchParams && { search: searchParams }),
            order_by,
          }
        : {
            page: currentPage,
            page_length: page_length,
          };

    const response = await axios.get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_records`,
      {
        params: params,
        headers: {
          // Your headers go here
        },
      }
    );

    const responseData = response?.data?.message;

    // Do something with responseData

    return responseData;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error;
  }
};

export async function getAgainstDate(
  doctype: any,
  value: any,
  module: string,
  appname?: string
){
  try {
    let data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_against_dates`,
      {
        headers: headers,
        params: value,
      }
    )
    return data
  } catch (error) {
    return error
  }
  // const data: any = [];
 
  
};

export const processSettlement = async (
  doctype: any,
  module: string,
  appname?: string
) => {
  let data = {};
  await axios
    .post(`${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`)
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const uploadExcel = async (
  doctype: any,
  records: {},
  module: string,
  appname?: string
) => {
  let data = {};
  await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const getJobSummaryReport = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.job_card_summury`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.data);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const getJobCardReport = async (filters?: any) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/htsinventory.inventory_mis_reports.api.job_card_report`,
      {
        headers: headers,
        params: {
          filters: filters || null,
        },
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const getClosingMonthLatest = async () => {
  let data: any = [];
  await axios
    .get(
      `${API_PATH}api/method/htssuite.utilities.doctype.close_month.api.get_latest_month`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};
export const SaveClosingMonthLatest = async (record: any) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/htssuite.utilities.doctype.close_month.api.create_record`,
      {
        data: { ...record },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSectionWiseReport = async (
  doctype: any,
  module: string,
  appname?: string,
  filters?: any
) => {
  const data: any = [];

  await axios
    .get(`${API_PATH}/api/method/${appname}.${module}.workshop.${doctype}`, {
      headers: headers,
      params: {
        filters: filters || null,
      },
    })
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getActiveVehicleDrivers = async (
  filterOne?: any,
  filterTwo?: any
) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/htsoperation.api.get_active_vehicles_drivers?type=${filterOne}&door_no=${filterTwo}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getActiveVehicles = async (filterOne: any, filterTwo: any) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/htsoperation.api.get_vehicles?type=${filterOne}&door_no=${filterTwo}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getActiveDrivers = async (vehicleType: any) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/htsoperation.api.get_drivers?type=${vehicleType}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const onCloseActivity = async (endPoint: any) => {
  let data: any = [];

  await axios
    .get(`${API_PATH}api/method/htsoperation.${endPoint}`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getVehicleTypeSeries = async (vehicle_type?: any) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/htsoperation.operations_master_data.doctype.vehicle_series.api.get_records?filters={"vehicle_type":"${vehicle_type}\"}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getTasksBasedOnProgress = async (filter?: any) => {
  let data: any = [];

  // api/method/htsoperation.task_management.doctype.task.api.get_records
  await axios
    .get(
      `${API_PATH}api/method/htsoperation.task_management.doctype.task.api.get_records?filters={"active":${filter}}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSupplier = async (
  value: any,
  appname?: string,
  doctype?: string,
  module?: string
) => {
  const params = {
    filters: JSON.stringify({ supplier: value }),
  };
  const data = await axios
    .get(
      `${API_PATH}/api/method/${appname}.${module}.doctype.${doctype}.api.get_records`,

      {
        headers: headers,
        params,
      }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

// http://127.0.0.1:8000/api/method/htsoperation.reports.vehicle_utilization_report?from_date=2023-12-26&to_date=2023-12-28&vehicle_type=Dumper

export const getVehicleUtilizationReport = async (
  fromDate?: any,
  toDate?: any,
  vehcileType?: any
) => {
  const data = await axios
    .get(
      `${API_PATH}/api/method/htsoperation.reports.vehicle_utilization_report?from_date=${fromDate}&to_date=${toDate}&vehicle_type=${vehcileType}`,

      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const SendPaymentAdvice = async (emaildata: any, appname: any) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.utility.sender_email`,
      // 'http://64.227.147.2:8000/api/method/htssuite.utility.sender_email',
      {
        data: emaildata,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const endShift = async (records: {}, subtask_id: any) => {
  let data = {};
  await axios
    .put(
      `${API_PATH}api/method/htsoperation.api.end_shift`,
      {
        subtask_id: subtask_id,
        data: records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const searchApi = async (params: any, appname?: string) => {
  // const data: any = [];
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.${params}`)
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getPdfData = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_pdf`,
      {
        headers: headers,
        params: value,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const createShift = async (
  doctype: any,
  records: {},
  module?: string,
  appname?: string
) => {
  let data: any = [];
  await axios
    .post(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`,
      {
        data: { ...records },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success

      data = response?.data?.message;
      // response?.data?.message?.fields?.map((items: any) =>
      //   data.push({
      //     label: items?.label,
      //     name: items?.fieldname,
      //     datatype: items?.datatype,
      //     options: null,
      //   })
      // );
    })
    .catch(function (error) {
      data =
        error?.response?.data?._server_messages ||
        error?.response?.data?.message;
    });
  return data;
};

export const updateShift = async (
  doctype: any,
  records: {},
  module?: string,
  appname?: string
) => {
  let data: any = [];
  await axios
    .put(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`,
      {
        data: { ...records },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      data = response?.data?.message;
    })
    .catch(function (error) {
      data =
        error?.response?.data?._server_messages ||
        error?.response?.data?.message;
    });
  return data;
};

export const getMonthwiseNetSalary = async (year: any) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}api/method/htssuite.mis_reports.api.total_salaries_month_wise?year=${year}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getClosingBalance = async (params: any) => {
  const data = await axios
    .get(
      `${API_PATH}api/method/htsaccount.inventory_account_configuration.doctype.inventory_general_ledger.api.get_closing_balance?name=${params}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSearchData = async (
  doctype: any,
  value: any,
  module: string,
  appname?: string
) => {
  const data = await axios
    .get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.search_product?search=${value}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getSalaryYear = async (year?: any) => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}/api/method/htssuite.mis_reports.api.total_salaries_month_wise?year=${year}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getNoticeEmployee = async () => {
  const data: any = [];

  await axios
    .get(
      `${API_PATH}/api/method/htssuite.mis_reports.api.employee_showcase_notice_report`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.data);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getPresentEmployee = async (date: any) => {
  let data: any = [];

  await axios
    .get(
      `${API_PATH}/api/method/htssuite.mis_reports.api.get_present_emp_count?date_string=${date}`,
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message?.data;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getEmpBirthday = async () => {
  let data: any = [];

  await axios
    .get(`${API_PATH}/api/method/htssuite.api.get_birthdays_and_anniversary`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success
      data.push(...response?.data?.message?.message);
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const generatePayslip = async (
  endPoint: any,
  filters?: any,
  appname?: string
) => {
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.${endPoint}`, {
      headers: headers,
      params: {
        filters: filters || null,
      },
    })
    .then(function (response: any) {
      // handle success
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getDesignationWiseEmployee = async (
  endPoint: any,
  appname?: string
) => {
  const data = await axios
    .get(`${API_PATH}api/method/${appname}.${endPoint}`, {
      headers: headers,
    })
    .then(function (response: any) {
      // handle success
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getAttendanceReconcilationData = async (
  doctype: any,
  module: string,
  currentPage: any,
  page_length: any,
  appname?: string,
  filters?: any,
  searchParams?: any,
  order_by?: any
) => {
  try {
    const params =
      filters || searchParams
        ? {
            page: currentPage,
            page_length: page_length,
            ...filters,
            ...(searchParams && { search: searchParams }),
            order_by,
          }
        : {
            page: currentPage,
            page_length: page_length,
          };

    const response = await axios.get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`,
      {
        params: params,
        headers: {
          // Your headers go here
        },
      }
    );

    const responseData = response?.data?.message;
    return responseData;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const importReconXlsx = async (value: any) => {
  // const data: any = [];
  const data = await axios
    .post(
      `${API_PATH}api/method/htssuite.leave_management.doctype.attendance_reconcilation.api.import_recon_xlsx`,
      {
        ...value,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};


export async function getERPStatusData(date:any) {
  try {
   let response = await axios.get(`${API_PATH}/api/method/htssuite.leave_management.doctype.attendance_reconcilation.api.erp_status_filters?date_string=${date}`,
    {
      headers : headers
    }
    )      
    return response?.data?.message?.data   
    
  } catch (error) {
    return error
  }
}

export const approveAttendance = async (value: any) => {
  // const data: any = [];
  const data = await axios
    .post(
      `${API_PATH}api/method/htssuite.leave_management.doctype.attendance_reconcilation.api.approve_all`,
      {
        data: { ...value },
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      // data.push(response?.data?.message?.data?.[0]);
      return response?.data?.message;
    })
    .catch(function (error) {
      // handle error
      return error;
    });
  return data;
};

export const getJobCardClose = async (
  doctype: any,
  module: string,
  currentPage: any,
  page_length: any,
  appname?: string,
  filters?: any,
  searchParams?: any,
  order_by?: any
) => {
  try {
    const params =
      filters
        ? {
            page: currentPage,
            page_length: page_length,
            filters: filters ,
            ...(searchParams && { search: searchParams }),
            order_by,
          }
        : {
            page: currentPage,
            page_length: page_length,
          };

    const response = await axios.get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`,
      {
        params: params,
        headers: {
          // Your headers go here
        },
      }
    );

    const responseData = response?.data?.message;
    return responseData;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateLeaveStatus = async (
  doctype: any,
  records: {},
  module = 'master_data',
  appname?: string
) => {
  let data = {};
  await axios
    .put(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}`,
      {
        ...records,
      },
      {
        headers: headers,
      }
    )
    .then(function (response: any) {
      // handle success
      data = response?.data?.message;
    })
    .catch(function (error) {
      data = error?.response?.data?.message;
    });
  return data;
};

export const purchaseMangementGetRecords = async (
  doctype: any,
  module: string,
  currentPage: number,
  page_length: number,
  appname?: string,
  filters?: any,
  searchParams?: any,
  searchProduct?:any,
  order_by?: any
) => {
  try {
    const params =
      filters || searchParams
        ? {
            page: currentPage,
            page_length: page_length,
            filters: filters || null,
            ...(searchParams && searchParams),
            ...(searchProduct && searchProduct),
            order_by,
          }
        : {
            page: currentPage,
            page_length: page_length,
          };

    const response = await axios.get(
      `${API_PATH}api/method/${appname}.${module}.doctype.${doctype}.api.get_records`,
      {
        params: params,
        headers: headers
      }
    );

    const responseData = response?.data?.message;

    // Do something with responseData

    return responseData;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error;
  }
};