import React, { useEffect, useState } from 'react';

import { Select, Space } from 'antd';
import {
  getLinkValue,
  getRoles,
  getTableData,
  searchApi,
} from '../../../../libs/common/api/doctype';
// @ts-ignore
import style from './select.module.scss';
import { isObject } from '../../../../libs/common/utils/common';

/**
 * @method SelectBox
 * Important props
 * @param {string} SelectMultiple -> to convert selectbox into multiSelect
 * @param {string} allowClear -> it displays a clear button to clear all the selected input
 * @param {Array} data -> each array elements should be an object with label and value properties.
 */

type Props = { text: string };

export const PlaceHolder = (props: Props) => {
  const { text = '' } = props;

  return <span className={style.placeHolder}>{text}</span>;
};
const filterMap: any = {
  contraVoucher: {
    ledger_name: [
      'in',
      [
        'CASH',
        'IDBI BANK LIMITED',
        'YES BANK LIMITED- A/c-118763700000100',
        'IDBI BANK LIMITED-Mudra Port',
      ],
    ],
  },
  jobCard: { status: ['not in', ['Closed']] },
  salaryParameter: {
    addition_deduction: 'Addition',
    display_on_add_allowance: 0,
    active: 1,
  },
  additinalAllowence: {
    active: 1,
    display_on_add_allowance: 1,
  },
};
const SelectBox = (props: any) => {
  const {
    width = '100%',
    height = props?.SelectMultiple ? 'auto' : '40px',
    data = [],
    SelectMultiple = false,
    placeholder = props?.fieldData?.placeholder || 'select',
  } = props;

  const [options, setoptions] = useState([]);
  const [value, setValue] = useState<any>(SelectMultiple ? [] : undefined);
  const [loading, setLoading] = useState(false);

  const mode: any = SelectMultiple
    ? 'multiple'
    : props?.fieldData?.description?.type === 'MultiSelect'
    ? 'multiple'
    : null;
  const defaultValue =
    mode === 'multiple' && props?.fieldData?.default?.length === 0
      ? []
      : props?.fieldData?.default?.length > 0
      ? props?.fieldData?.default
      : null;
  const handleChange = (value: string) => {
    if (props?.handleChange) {
      props?.handleChange(value);
    }
    if (props?.onChange) {
      props?.onChange(value);
    }
  };
  const getFilters = () => {
    if (props?.fieldData?.description?.showActive) {
      return { active: 1 };
    } else if (props?.fieldData?.description?.showStatus) {
      const spiT = props?.fieldData?.description?.showStatus?.split(',');

      return { status: ['in', spiT] };
    } else if (props?.fieldData?.description?.filterName) {
      return filterMap[props?.fieldData?.description?.filterName];
    }
    return {};
  };
  const filter = getFilters();

  useEffect(() => {
    //  const dataIndex = props?.fieldData?.description?.linkfield;

    if (props?.value && options) {
      // let val = props?.formValue[props?.id];

      //  commented while adding its showing previously values
      let val = props?.isformSelect
        ? props?.formValue[props?.id]
        : props?.value || props?.formValue[props?.id];

      if (isObject(val)) {
        if (val?.[props?.id]) {
          val = val?.[props?.id];
        } else if (val?.id) {
          val = val?.name;
        }
      }

      setValue(val);
    } else {
      setValue(null);
    }
  }, [props?.value, props?.formValue]);

  useEffect(() => {
    if (
      props?.fieldData?.datatype === 'Link' &&
      props?.fieldData?.name === 'role_name'
    ) {
      getRoles(props?.appname).then((items: any) => {
        if (items && items?.length > 0) {
          const da: any = [];
          items?.map((items: any) =>
            da.push({ label: items?.role_name, value: items?.name })
          );
          setoptions(da);
        }
      });
    } else if (props?.fieldData.name === 'supplier') {
      getTableData(
        'inventory_supplier_details',
        'inventory_general_setup',
        'htsinventory',
        JSON.stringify({ active: 1 })
      ).then((items) => {
        const supplierData: any = [];
        items?.map(({ name, supplier_name }: any) => {
          supplierData.push({
            label: supplier_name,
            value: name,
          });
        });
        setoptions(supplierData);
      });
    } else if (props?.fieldData.name === 'employee_modules') {
      getLinkValue(
        props?.fieldData?.options,
        props?.fieldData?.description,
        props?.fieldData?.description?.appname || props?.appname,
        JSON.stringify(filter)
      ).then((items: any) => {
        const supplierData: any = [];
        items?.map(({ name, supplier_name }: any) => {
          supplierData.push({
            label: supplier_name,
            value: name,
          });
        });
        setoptions(supplierData);
      });
    } else if (
      (props?.fieldData?.datatype === 'Link' ||
        props?.fieldData?.datatype === 'Data' ||
        props?.fieldData?.datatype === 'LinkSearch') &&
      !props?.fieldData?.description?.defaultCall
    ) {
      // if (props?.fieldData?.name === 'part')
      //const filters = getFilters();

      getLinkValue(
        props?.fieldData?.options,
        props?.fieldData?.description,
        props?.fieldData?.description?.appname || props?.appname,
        JSON.stringify(filter)
      ).then((items: any) => {
        if (
          (props?.selectboxValue && props?.selectboxValue?.length > 0) ||
          (props?.showProductlist &&
            props?.showProductlist?.length > 0 &&
            props?.fieldData?.name === 'part') ||
          (props?.hideSelectData &&
            props?.hideSelectData?.length > 0 &&
            props?.fieldData?.name === 'part')
        ) {
          let newItems: any = [];

          if (props?.selectboxValue && props?.selectboxValue?.length > 0) {
            const neItems: any = items.filter(
              (ni: any) =>
                !props?.selectboxValue.some(
                  (si: any) => si?.product?.id === ni?.value
                )
            );

            newItems = neItems;
          }

          if (props?.hideSelectData && props?.hideSelectData?.length > 0) {
            const its = newItems && newItems?.length > 0 ? newItems : items;

            const neItems: any = its.filter(
              (ni: any) =>
                !props?.hideSelectData.some(
                  (si: any) => si?.product?.id === ni?.value
                )
            );

            newItems = neItems;
          }

          if (props?.showProductlist && props?.showProductlist?.length > 0) {
            const its = newItems && newItems?.length > 0 ? newItems : items;

            const neItems: any = its.filter((ni: any) =>
              props?.showProductlist.includes(ni?.value)
            );

            newItems = neItems;
          }

          setoptions(newItems);
        } else {
          setoptions(items);
        }
      });
    } else {
      if (
        props?.fieldData?.options &&
        props?.fieldData?.options?.length > 0 &&
        Array.isArray(props?.fieldData?.options)
      ) {
        let newItems = props?.fieldData?.options;
        if (props?.hideSelectData && props?.hideSelectData?.length > 0) {
          const its = props?.fieldData?.options;

          const neItems: any = its.filter(
            (ni: any) =>
              !props?.hideSelectData.some(
                (si: any) => si?.product?.id === ni?.value
              )
          );

          newItems = neItems;
        }

        setoptions(newItems || []);
      } else {
        setoptions([]);
      }
      // setoptions(props?.fieldData?.options || []);
    }
  }, [
    props?.fieldData?.datatype,
    props?.fieldData?.options,
    props?.hideSelectData,
    props?.selectboxValue,
    props?.showProductlist,
  ]);
  const handleClear: any = (e: any) => {
    setValue(SelectMultiple ? [] : undefined);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const dec = props?.fieldData?.description || null;

  const filterOptionData = (input: any, option: any) => {
    const description = props?.fieldData?.description?.search;
    if (!description) {
      return (
        option?.label
          ?.toString()
          ?.toLowerCase()
          .indexOf(input?.toString()?.toLowerCase()) >= 0
      );
    }
  };

  return (
    <div>
      <Select
        size={'large'}
        onChange={handleChange}
        style={{ width, height }}
        showSearch={true}
        options={[...options] || []}
        loading={loading}
        defaultValue={defaultValue}
        {...props}
        value={value || null}
        placeholder={
          <PlaceHolder text={props?.fieldData?.placeholder || placeholder} />
        }
        mode={mode}
        filterOption={dec?.filter ? filterOption : filterOptionData}
        disabled={
          props?.fieldData?.disabled || props?.fieldData?.readonly || false
        }
        maxTagCount={'responsive'}
        allowClear
        onClear={handleClear}
      />
    </div>
  );
};

export default SelectBox;
