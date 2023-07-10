import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Typography,
  TextField,
  DialogContent,
  Grid,
  DialogActions,
  Button,
  DialogTitle,

} from '@mui/material';

const AddHistory = ({ openDialog, onClose, afterUpgradeInfoFields, onSave }) => {
   
        const [dialogData, setDialogData] = useState({
            additionalInfo : [], upgradeRequirement : '', emailSubject : '', reason : ''
          });

          useEffect(() => {
    if (openDialog) {
      resetState();
    }
  }, [openDialog]);

  const resetState = () => {
    setDialogData({
      additionalInfo: new Array(afterUpgradeInfoFields.length).fill(''),
      upgradeRequirement: '',
      emailSubject: '',
      reason: ''
    });
  };

          const handleInputChange = (event) => {
            const { name, value } = event.target;
            setDialogData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };

          const handleInputArrayChange = (event, index) => {
            const { name, value } = event.target;
            setDialogData((prevData) => {
              const updatedAdditionalInfo = [...prevData.additionalInfo];
              updatedAdditionalInfo[index] = value;
              return {
                ...prevData,
                additionalInfo: updatedAdditionalInfo,
              };
            });
          };

          const handleSave = () => {
            onSave(dialogData);
          };

return (
  <Dialog
  open={openDialog}
  onClose={onClose}
  sx={{ "& .MuiDialog-paper": { maxWidth: "900px" } }}
>
<DialogTitle>Add History</DialogTitle>
  <DialogContent>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', borderBottom: '1px solid black' }}>
          Configuration
        </Typography>
      </Box>
    </Grid>
    {afterUpgradeInfoFields.map((field, index) => (
      <Grid item xs={4}>
        <TextField
          key={index}
          label={field}
          value={dialogData.additionalInfo[index]}
          onChange={(event) => handleInputArrayChange(event, index)}
          size="small"
          margin="normal"
        />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', borderBottom: '1px solid black' }}>
          Requisition Info
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Requirement"
        name='upgradeRequirement'
        onChange={handleInputChange}
        value={dialogData.upgradeRequirement}
        size="small"
        margin="normal"
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Email Subject"
        name='emailSubject'
        onChange={handleInputChange}
        value={dialogData.emailSubject}
        size="small"
        margin="normal"
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Reason"
        name='reason'
        onChange={handleInputChange}
        value={dialogData.reason}
        size="small"
        margin="normal"
      />
    </Grid>
    
    </Grid>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={() => handleSave()}>Save</Button>
    </DialogActions>
  </DialogContent>
</Dialog>
    
);

};
export default AddHistory;