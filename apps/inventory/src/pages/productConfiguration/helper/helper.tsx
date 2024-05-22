export const ProductFilter = [
    // {
    //   datatype: 'Search',
    //   label: '',
    //   name: 'search',
    //   options: undefined,
    //   placeHolder: "Search by Indent no"
    // },
    {
      datatype: 'Filter',
      name: 'filter',
      isReq: false,
      // height:'31px',
      width:"100%",
      padding:'3px',
      sidebarItems: [
        {
          label: 'UOM',
          appname:'htsinventory',
          module: 'inventory_product_configuration',
          doctype: 'inventory_unit_of_measurement',
          singleselect: true,
          key: 'uom_name',
          valuefield: 'name',
          // id: 'name',
          name:'uom',
          filter: JSON.stringify({'Active': '1'}),
        },
        {
            label: 'Make',
            appname:'htsinventory',
            module: 'inventory_product_configuration',
            doctype: 'inventory_brand_master',
            singleselect: true,
            key: 'brand_name',
            valuefield: 'name',
            // id: 'name',
            name:'make',
            filter: JSON.stringify({'Active': '1'}),
          },
          {
            label: 'Used For',
            appname:'htsinventory',
            module: 'inventory_product_configuration',
            doctype: 'inventory_product_used_for',
            singleselect: true,
            key: 'product_used_for',
            valuefield: 'name',
            // id: 'name',
            name:'used_for',
            filter: JSON.stringify({'Active': '1'}),
          },
        
      ]
    }
  
  ];