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
} from '@mui/material';

const EditRequest = ({ openDialog, onClose, onSave, clientList,setClient,selectedRow, serverTypeList, additionalInfoFields }) => {
 // const [selectedRow, setSelectedRow] = useState(null);
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
  const [afterUpgradeInfoFields, setAfterUpgradeInfoFields] = useState([]);
  const [dialogData, setDialogData] = useState({
    serverName: '', hostedAt : '' , ipAddress :'', client : '', serverType : '' , esxiServer : '',
    usage : '', additionalInfo : [], email : '', reason : '', requestedBy : ''

  });
  useEffect(() => {
    if (selectedRow) {
      setDialogData(selectedRow);
      
    } else {
      setDialogData({
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
      });
    }
  }, [selectedRow]);
 //  setDialogData(selectedRow)
  const handleSave = () => {
   
    const isValid = validateFields();
      if (isValid) {
    onSave(dialogData);
      }
  };

/*   const handleInputChange = (event) => {
    setDialogData(selectedRow)
    const { name, value } = event.target;
    setDialogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; */
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
      <DialogTitle>{selectedRow ? 'Edit Row' : 'Add Row'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
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
              InputProps={{readOnly: false,}}
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
              InputProps={{readOnly: false,}}
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
         InputProps={{readOnly: false,}}
         />,          
       </Grid>
       <Grid item xs={6}>
    <FormControl fullWidth>
      <InputLabel id="client-select-label">Client</InputLabel>
      <Select
  labelId="client-select-label"
  name="client"
  defaultValue={selectedRow ? selectedRow.client : ''}
  onChange={(e) => setClient(e.target.value)}
  margin="normal"
  size="small"
  error={!!clientError}
  helperText={clientError}
  inputProps={{ readOnly: false }}
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
              defaultValue={selectedRow ? selectedRow.serverType : ''}
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
             name='esxiServer'
              value={dialogData.esxiServer}
              onChange={handleInputChange}
              size="small"
              margin="normal"
              error={!!esxiServerError}
              helperText={esxiServerError}
              InputProps={{readOnly: false,}}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
             label="Usage"
             name='usage'
              value={dialogData.usage}
              onChange={handleInputChange}
              size="small"
              margin="normal"
              error={!!usageError}
              helperText={usageError}
              InputProps={{readOnly: false,}}
          />
        </Grid>

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
              InputProps={{readOnly: false,}}
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
              InputProps={{readOnly: false,}}
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
              InputProps={{readOnly: false,}}
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

export default EditRequest;
