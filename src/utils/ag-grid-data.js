const colDefs = [
  { field: 'select', sortable: true, checkboxSelection: true, headerName: '' },
  { field: 'date', sortable: true, valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
  { field: 'description' },
  { field: 'category' },
  { field: 'amount', sortable: true, valueFormatter: (params) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value) },
  { field: 'account' },
];

const autoSizeStrategy = {
  type: 'fitGridWidth',
  columnLimits: [
    { colId: 'select', maxWidth: 50 },
    { colId: 'date', maxWidth: 100 },
  ],
};

export { colDefs, autoSizeStrategy };
