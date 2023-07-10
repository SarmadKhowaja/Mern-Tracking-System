import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputLabel,
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';

const initialDialogData = {
  serverName: '',
  hostedAt: '',
  ipAddress: '',
  client: '',
  serverType: '',
  esxiServer: '',
  usage: '',
  additionalInfo: [],
  email: '',
  reason: '',
  requestedBy: ''
};

const AddNewRequest = ({ openDialog, onClose, onSave, clientList, serverTypeList, additionalInfoFields }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [ipAddressError, setipAddressError] = useState('');
  const [serverNameError, setServerNameError] = useState('');
  const [hostedAtError, sethostedAtError] = useState('');
  const [clientError, setclientError] = useState('');
  const [serverTypeError, setserverTypeError] = useState('');
  const [esxiServerError, setesxiServerError] = useState('');
  const [emailError, setemailError] = useState('');
  const [usageError, setusageError] = useState('');
  const [reasonError, setreasonError] = useState(''); 
  const [requestedByError, setrequestedByError] = useState('');
  const [virtualMachineError, setVirtualMachineError] = useState(''); 
  const [afterUpgradeInfoFields, setAfterUpgradeInfoFields] = useState([]);
  const [dialogData, setDialogData] = useState(initialDialogData);
  const [isVirtualMachine, setIsVirtualMachine] = useState(false);


  useEffect(() => {
    if (!openDialog) {
      setDialogData(initialDialogData); // Reset dialogData when dialog is closed
    }
  }, [openDialog]);

  const handleSave = () => {
    const isValid = validateFields();
      if (isValid) {
    onSave(dialogData);
      }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDialogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    let isValid = true;
  
    if (!dialogData.serverName) {
      setServerNameError("Server name is required");
      isValid = false;
    } else {
      setServerNameError("");
    }
  
    if (!dialogData.ipAddress) {
      setipAddressError("IP address is required");
      isValid = false;
    } else {
      setipAddressError("");
    }
  
    if (!dialogData.hostedAt) {
      sethostedAtError("Hosted at is required");
      isValid = false;
    } else {
      sethostedAtError("");
    }


    if (!dialogData.client) {
      setclientError("Client is required");
      isValid = false;
    } else {
      setclientError("");
    }

    if (!dialogData.serverType) {
      setserverTypeError("Server Type is required");
      isValid = false;
    } else {
      setserverTypeError("");
    }
    if (!dialogData.usage) {
      setusageError("Usage is required");
      isValid = false;
    } else {
      setusageError("");
    }
    
    if (!dialogData.esxiServer) {
      setesxiServerError("EsxiServer is required");
      isValid = false;
    } else {
      setesxiServerError("");
    }

    
    if (!dialogData.email) {
      setemailError("Email Subject is required");
      isValid = false;
    } else {
      setemailError("");
    }

    
    if (!dialogData.requestedBy) {
      setrequestedByError("Email Subject is required");
      isValid = false;
    } else {
      setrequestedByError("");
    }

    
    if (!dialogData.reason) {
      setreasonError("Reason is required");
      isValid = false;
    } else {
      setreasonError("");
    }
  
    return isValid;
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

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { maxWidth: "900px" } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle>{'Add Row'}</DialogTitle>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1 }}>Virtual Machine</Typography>
            <Checkbox
              checked={isVirtualMachine}
              onChange={() => setIsVirtualMachine(!isVirtualMachine)}
              color="primary"
            />
          </Box>
        </Grid>
      </Box>
      <DialogContent>
        <Grid container spacing={2}>
          {isVirtualMachine ? (
            <>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 'bold',
                      borderBottom: '1px solid black',
                    }}
                  >
                    Basic Info
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ mt: 2 }}>
  <FormControl fullWidth>
    <InputLabel id="serverName-select-label">Server Name</InputLabel>
    <Select
      labelId="serverName-select-label"
      name="serverName"
      value={dialogData.serverName}
      onChange={handleInputChange}
      margin="normal"
      size="small"
      error={!!serverNameError}
      helperText={serverNameError}
    >
      {/* Render the options for server names */}
    </Select>
  </FormControl>
</Grid>
              <Grid item xs={4}>
  <TextField
    label="Virtual Machine"
    name="virtualMachine"
    value={dialogData.virtualMachineName}
    onChange={handleInputChange}
    size="small"
    margin="normal"
    error={!!virtualMachineError}
    helperText={virtualMachineError}
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="Hosted"
    name="hosted"
    value={dialogData.hosted}
    onChange={handleInputChange}
    size="small"
    margin="normal"
    error={!!hostedAtError}
    helperText={hostedAtError}
  />
</Grid>
              
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 'bold',
                      borderBottom: '1px solid black',
                    }}
                  >
                    Basic Info
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Server Name"
                  name="serverName"
                  value={dialogData.serverName}
                  onChange={handleInputChange}
                  size="small"
                  margin="normal"
                  error={!!serverNameError}
                  helperText={serverNameError}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="IP Address"
                  name="ipAddress"
                  value={dialogData.ipAddress}
                  onChange={handleInputChange}
                  size="small"
                  margin="normal"
                  error={!!ipAddressError}            
                  helperText={ipAddressError}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Hosted At"
                name="hostedAt"
                value={dialogData.hostedAt}
                onChange={handleInputChange}
                size="small"
                margin="normal"
                error={!!hostedAtError}
                helperText={hostedAtError}
              />
            </Grid>
            <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select
              labelId="client-select-label"
              name="client"
              value={dialogData.client}
              onChange={handleInputChange}
              margin="normal"
              size="small"
              error={!!clientError}
              helperText={clientError}
            >
              {clientList.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="serverType-select-label">Type</InputLabel>
            <Select
              labelId="serverType-select-label"
              name="serverType"
              value={dialogData.serverType}
              onChange={handleInputChange}
              size="small"
              margin="normal"
              error={!!serverTypeError}
              helperText={serverTypeError}
            >
              {serverTypeList.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="EsxiServer"
            name="esxiServer"
            value={dialogData.esxiServer}
            onChange={handleInputChange}
            size="small"
            margin="normal"
            error={!!esxiServerError}
            helperText={esxiServerError}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Usage"
            name="usage"
            value={dialogData.usage}
            onChange={handleInputChange}
            size="small"
            margin="normal"
            error={!!usageError}
            helperText={usageError}
          />
        </Grid>
          </>
        )}
        
        <Grid item xs={12}> 
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', borderBottom: '1px solid black' }}>
  Configuration
</Typography>
</Box>
        </Grid>
{additionalInfoFields.map((field, index) => (
            <Grid item xs={4}> 

  <TextField 
    key={index}
    label={field}
    name={field}
    value={dialogData.additionalInfo[index]}
    size="small"
    onChange={(event) => handleInputArrayChange(event, index)}
    fullWidth
    margin="normal"
  />
  </Grid>
))}

<Grid item xs={12}> 
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', borderBottom: '1px solid black' }}>
  Other Info
</Typography>

</Box>
        </Grid>
        <Grid item xs={4}>
          <TextField
             label="Email Subject"
             name='email'
              value={dialogData.email}
              onChange={handleInputChange}
              size="small"
              margin="normal"
              error={!!emailError}
              helperText={emailError}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
             label="Reason"
             name='reason'
              value={dialogData.reason}
              onChange={handleInputChange}
              size="small"
              margin="normal"
              error={!!reasonError}
              helperText={reasonError}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
             label="Requested By"
             name='requestedBy'
              value={dialogData.requestedBy}
              onChange={handleInputChange}
              size="small"
              margin="normal"
              error={!!requestedByError}
              helperText={requestedByError}
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

export default AddNewRequest;
