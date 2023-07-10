import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "clientName", headerName: "Client Name", width: 150 },
  { field: "serverName", headerName: "Server Name", width: 150 },
  { field: "ipAddress", headerName: "IP Address", width: 150 },
  { field: "serverType", headerName: "Server Type", width: 150 },
  { field: "usage", headerName: "Usage", width: 150 },
  { field: "hostedAt", headerName: "Hosted At", width: 150 },
  { field: "esxiServer", headerName: "ESXiServer", width: 150 },
  { field: "requestedBy", headerName: "Requested By", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "completionDate", headerName: "Completion Date", width: 150 },
  { field: "configCR", headerName: "Configuration / CR#", width: 200 },
  { field: "email", headerName: "Email.", width: 150 },
  { field: "subject", headerName: "Subject", width: 150 },
  { field: "reason", headerName: "Reason", width: 150 },
];

const initialRows = [
  { id: 1, clientName: "Client 1", serverName: "Server 1", ipAddress: "192.168.1.1", serverType: "Type 1", usage: "Usage 1", hostedAt: "Hosted At 1", esxiServer: "ESXi Server 1", requestedBy: "Requester 1", type: "Type 1", completionDate: "2022-01-01", configCR: "CR#123", email: "email1@example.com", subject: "Subject 1", reason: "Reason 1" },
  { id: 2, clientName: "Client 2", serverName: "Server 2", ipAddress: "192.168.1.2", serverType: "Type 2", usage: "Usage 2", hostedAt: "Hosted At 2", esxiServer: "ESXi Server 2", requestedBy: "Requester 2", type: "Type 2", completionDate: "2022-01-02", configCR: "CR#234", email: "email2@example.com", subject: "Subject 2", reason: "Reason 2" },
];

const DatagridComponent = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleAdd = () => {
    setSelectedRow({});
    setOpenDialog(true);
  };

  const handleEdit = (params) => {
    setSelectedRow(params.row);
    setOpenDialog(true);
  };

  const handleSave = () => {
    const newRows = [...rows];
    const index = newRows.findIndex((row) => row.id === selectedRow.id);
    if (index !== -1) {
      newRows[index] = selectedRow;
      setRows(newRows);
    } else {
      setSelectedRow({ id: rows.length + 1, ...selectedRow });
      setRows([...rows, selectedRow]);
    }
    setOpenDialog(false);
    };
    
    const handleCancel = () => {
    setOpenDialog(false);
    };
    
    const handleRowSelection = (params) => {
    if (params.isSelected) {
    setSelectedRow(params.data);
    } else {
    setSelectedRow({});
    }
    };
    
    return (
    <div style={{ height: 500, width: "100%" }}>
    <DataGrid
    rows={rows}
    columns={columns}
    rowHeight={38}
    checkboxSelection
    disableSelectionOnClick
    onSelectionModelChange={handleRowSelection}
    components={{
    Toolbar: GridToolbar,
    }}
    />
    <Button variant="contained" color="primary" onClick={handleAdd}>
    Add
    </Button>
    <Dialog open={openDialog} onClose={handleCancel}>
    <DialogTitle>{selectedRow.id ? "Edit Row" : "Add Row"}</DialogTitle>
    <DialogContent>
    {columns.map((column) => (
    <TextField
    key={column.field}
    label={column.headerName}
    value={selectedRow[column.field] || ""}
    onChange={(event) =>
    setSelectedRow({ ...selectedRow, [column.field]: event.target.value })
    }
    fullWidth
    />
    ))}
    </DialogContent>
    <DialogActions>
    <Button onClick={handleCancel}>Cancel</Button>
    <Button onClick={handleSave}>Save</Button>
    </DialogActions>
    </Dialog>
    </div>
    );
    };
    
    export default DatagridComponent;
    
    