import React from 'react';
import {
  Dialog,
  Button,
  Grid,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const ViewHistory = ({ openDialog, onClose, modificationtable, onEdit }) => {
  const handleOpenDialog = (row, isEditMode) => {
    onEdit(row, isEditMode);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      maxWidth="900px"
    >
      <DialogTitle>History</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table >
            <TableHead>
              <TableRow sx={{fontWeight: 'bold', font:'12px'}}>
                <TableCell sx={{fontWeight: 'bold', font:'12px'}}>CPU</TableCell>
                <TableCell sx={{fontWeight: 'bold', font:'12px'}}>HDD</TableCell>
                <TableCell sx={{fontWeight: 'bold', font:'12px'}}>OS</TableCell>
                <TableCell sx={{fontWeight: 'bold', font:'12px'}}>RAM</TableCell>
                <TableCell sx={{fontWeight: 'bold', font:'12px'}}>Reason</TableCell>
                <TableCell sx={{fontWeight: 'bold', font:'12px'}}>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modificationtable.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.configAfterUpgradeObj.CPU}</TableCell>
                  <TableCell>{row.configAfterUpgradeObj.HDD}</TableCell>
                  <TableCell>{row.configAfterUpgradeObj.OS}</TableCell>
                  <TableCell>{row.configAfterUpgradeObj.RAM}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewHistory;
