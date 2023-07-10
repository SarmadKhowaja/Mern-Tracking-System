import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const columns = [
  { field: 'serverName', headerName: 'Server Name', width: 150 },
  { field: 'client', headerName: 'Client', width: 200 },
  { field: 'serverType', headerName: 'Server Type', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 , hide : true },
  { field: 'ipAddress', headerName: 'IP Address', width: 150 },
  { field: 'hostedAt', headerName: 'Hosted At', width: 150 },
  { field: 'configuration', headerName: 'Configuration', width: 350 },
  { field: 'usage', headerName: 'Usage', width: 150 , hide : true },
  { field: 'esxiServer', headerName: 'EsxiServer', width: 150 , hide : true },
  { field: 'requestedBy', headerName: 'Requested By', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 , hide : true},
  { field: 'reason', headerName: 'Reason', width: 150 , hide : true},

];


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [serverName, setServerName] = useState('');
  const [client, setClient] = useState('');
  const [type, setType] = useState('');
  const [hostedAt, setHostedAt] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [usage, setUsage] = useState('');
  const [esxiServer, setEsxiServer] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [serverType, setServerType] = useState('');
  const [completionDate , setCompletionDate] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [clientList, setClientList] = useState([]);
  const [serverTypeList, setserverTypeList] = useState([]);
  const [additionalInfoFields, setAdditionalInfoFields] = useState([]);
  const [serverNameError, setServerNameError] = useState("");
  const [ipAddressError, setIpAddressError] = useState("");
  const [hostedAtError, setHostedAtError] = useState("");  
  const [clientError, setclientError] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [serverTypeError, setserverTypeError] = useState("");
  const [usageError, setusageError] = useState("");  
  const [esxiServerError, setesxiServerError] = useState("");
  const [requestedByError, setrequestedByError] = useState("");
  const [emailError, setemailError] = useState("");  
  const [reasonError, setreasonError] = useState("");  
  const [afterUpgradeInfoFields, setAfterUpgradeInfoFields] = useState([]);
  const [afterUpgrade, setAfterUpgrade] = useState(Array(afterUpgradeInfoFields.length).fill(""));
  const [upgradeRequirement, setUpgradeRequirement] = useState('');
  const [emailSubjects, setEmailSubjects] = useState('');
  const [reasons, setreasons] = useState('');
  const [modificationtable , setmodificationTable] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState(Array(additionalInfoFields.length).fill(""));

  const handleAdd = () => {
    setSelectedRow({});
    setOpenDialog(true);
  };

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/requisition/getData/');
      const data = await response.json();
      setClientList(data.clientList)
      setserverTypeList(data.serverTypeList)
      setAdditionalInfoFields(data.configurationList[0].fields)
    //   setData(data.Tracking)
   const gridData = SetGridData(data.Tracking)
   setData(gridData)
    };
    fetchData();
  }, []);


  const SetGridData = (dataGrid) => {
    const list = dataGrid.map((c) => {
      return {
        id : c._id,
        client: c.client.name,
        serverName : c.serverName,
        ipAddress : c.ipAddress,
        serverType : c.serverType.name,
        usage : c.usage,
        hostedAt : c.hostedAt,
        esxiServer : c.esxiServer,
        requestedBy : c.requestedBy,
        type : c.type,    
        configuration : c.configuration,
        email : c.email,
        configObj : c.configObj,
        reason : c.reason,
        trackingModification : c.trackingModification
        // Add other properties as needed
      };
    });
  
    return list;
  };

const UpdateOperation = async (updatedRow) => {
  const response = await fetch('/api/requisition/'+updatedRow._id+'/update/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedRow),
  });

  const responseData = await response.json();

  if (response.ok) {
    
    const response = await fetch('/api/requisition/getData/');
    const data = await response.json();
    const gridData = SetGridData(data.Tracking)
    setData(gridData)

  }
  setOpenDialog(false);

}

const SaveOpertaion = async (updatedRow) =>{
    const response = await fetch('/api/requisition/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow),
      });
  
      const responseData = await response.json();

      if (response.ok) {

        const response = await fetch('/api/requisition/getData/');
        const data = await response.json();
        const gridData = SetGridData(data.Tracking)
        setData(gridData)
     
      }
  
      setOpenDialog(false);
};

  const handleAddClick = () => {
    setSelectedRow(null);
    setServerName('');
    setClient('');
    //setType('');
    setIpAddress('');
    setHostedAt('');
    setUsage('');
    setEsxiServer('');
    setRequestedBy('');
    setServerType('');
    setEmail('');
    setReason('');
    initailizeErrorList();
    setOpenDialog(true);
  };




  const initailizeErrorList = ()=>{
    setServerNameError('');
    setclientError('');
    setserverTypeError('');
    setusageError('');
    setesxiServerError('');
    setHostedAtError('');
    setIpAddressError('');
    setemailError('');
    setrequestedByError('');
    setreasonError('');
  }

  const handleEditClick = (row) => {
    initailizeErrorList();
    const selectedItem = serverTypeList.find(
      (c) => c.name === row.row.serverType
    );

    const selectedClientItem = clientList.find(
      (c) => c.name === row.row.client
    );
    setSelectedRow(row);
    setServerName(row.row.serverName);
    setClient(selectedClientItem._id);
    setType(row.row.type);
    setIpAddress(row.row.ipAddress);
    setHostedAt(row.row.hostedAt);
    setUsage(row.row.usage);
    setEsxiServer(row.row.esxiServer);
    setRequestedBy(row.row.requestedBy);
    setServerType(selectedItem._id);
    setEmail(row.row.email);
    setReason(row.row.reason);
    setConfigurationObj(row.row.configObj);
    const getModification =  setModificationTableList(row.row.trackingModification);
    setmodificationTable(getModification)

    setOpenDialog(true);
  };

 function setModificationTableList(list)
 {
   
  const returnlist = list.map((c) => {
    return {

      configurationBeforeUpgrade : objectToString(c.configurationBeforeUpgrade),
      configBeforeupObj : c.configurationBeforeUpgrade, 
      upgradeRequirement : c.upgradeRequirement,
      configurationAfterUpgrade : objectToString(c.configurationAfterUpgrade),
      configAfterUpgradeObj : c.configurationAfterUpgrade,
      emailSubject : c.emailSubject,
      reason : c.reason,
      _id : c._id

    }
  });

  return returnlist;

 }
 
 function objectToString(obj) {
  const entries = Object.entries(obj);
  const keyValuePairs = entries.map(([key, value]) => `${key}=${value}`);
  const result = keyValuePairs.join(', ');
  return result;
}

  const setConfigurationObj = (row) => {
    additionalInfoFields.forEach((c, index) => {
      if (Object.keys(row).includes(c)) {
        const value = row[c];
        setAdditionalInfo(prevAdditionalInfo => {
          const newAdditionalInfo = [...prevAdditionalInfo];
          newAdditionalInfo[index] = value;
          return newAdditionalInfo;
        });
      }
    });
  };
  

  
  const setModificationConfigurationObj = (row) => {
    afterUpgradeInfoFields.forEach((c, index) => {
      if (Object.keys(row).includes(c)) {
        const value = row[c];
        setAfterUpgrade(prevAdditionalInfo => {
          const newAdditionalInfo = [...prevAdditionalInfo];
          newAdditionalInfo[index] = value;
          return newAdditionalInfo;
        });
      }
    });
  };
  



  const getConfigObject  = (feildInfo , objInfo) => {
    const additionalInfoObject = feildInfo.reduce((obj, field, index) => {
      obj[field] = objInfo[index];
      return obj;
    }, {});
  
    return additionalInfoObject;
  };
  


  const handleSaveClick = (e) => {
    e.preventDefault();
    const getConfigObj = getConfigObject(additionalInfoFields , additionalInfo)
    
    let newData;
    if (selectedRow) {
      const updatedRow = {
        _id : selectedRow.id,    
        serverName: serverName,
        ipAddress: ipAddress,
        serverType: serverType,
        client : client,
        usage: usage,
        hostedAt: hostedAt,
        esxiServer: esxiServer,
        requestedBy: requestedBy,
        type: "Modify",    
        configuration: getConfigObj,
        email: email,
        reason: reason,
        completionDate : "2023-04-01",
        subject : "test",
        
      };
      // Update operation
      newData = data.map((row) => (row.id === selectedRow.id ? updatedRow : row));
      UpdateOperation(updatedRow);
    } else {
      // Add operation
      const newRow = {
        serverName: serverName,
        ipAddress: ipAddress,
        serverType: serverType,
        client : client,
        usage: usage,
        hostedAt: hostedAt,
        esxiServer: esxiServer,
        requestedBy: requestedBy,
        type: "New",    
        configuration: getConfigObj,
        email: email,
        reason: reason,
        completionDate : "2023-04-01",
        subject : "test",
        
      };
      const isValid = validateFields();
      if (isValid) {
  
      SaveOpertaion(newRow);
      }
    }
  };


  const validateFields = () => {
    let isValid = true;
  
    if (!serverName) {
      setServerNameError("Server name is required");
      isValid = false;
    } else {
      setServerNameError("");
    }
  
    if (!ipAddress) {
      setIpAddressError("IP address is required");
      isValid = false;
    } else {
      setIpAddressError("");
    }
  
    if (!hostedAt) {
      setHostedAtError("Hosted at is required");
      isValid = false;
    } else {
      setHostedAtError("");
    }


    if (!client) {
      setclientError("Client is required");
      isValid = false;
    } else {
      setclientError("");
    }

    if (!serverType) {
      setserverTypeError("Server Type is required");
      isValid = false;
    } else {
      setserverTypeError("");
    }
    if (!usage) {
      setusageError("Usage is required");
      isValid = false;
    } else {
      setusageError("");
    }
    
    if (!esxiServer) {
      setesxiServerError("EsxiServer is required");
      isValid = false;
    } else {
      setesxiServerError("");
    }

    
    if (!email) {
      setemailError("Email Subject is required");
      isValid = false;
    } else {
      setemailError("");
    }

    
    if (!requestedBy) {
      setrequestedByError("Email Subject is required");
      isValid = false;
    } else {
      setrequestedByError("");
    }

    
    if (!reason) {
      setreasonError("Reason is required");
      isValid = false;
    } else {
      setreasonError("");
    }
  
    return isValid;
  };
  


  const handleOpenDialog = (row, isEditMode) => {
   
    setIsEditMode(isEditMode);
    setAfterUpgradeInfoFields(additionalInfoFields);
    if(isEditMode){
      setModificationConfigurationObj(row.configAfterUpgradeObj);
      setUpgradeRequirement(row.upgradeRequirement);
      setEmailSubjects(row.emailSubject);
      setreasons(row.reason);
      

    }
    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSave = () => {
if(isEditMode == false){
  
  addNewModifications();

}else{
  UpdateSelectedModification();
}
  }


  const UpdateSelectedModification = async () => {

  }

  const addNewModifications = async () => {
    try {
      // Get the configuration objects from the form inputs
      const getPerviousConfigObj = getConfigObject(additionalInfoFields , additionalInfo);
      const getAfterConfigObj = getConfigObject(afterUpgradeInfoFields , afterUpgrade);
  
      // Create a new tracking modification object
      const trackingModification = {
        configurationBeforeUpgrade: getPerviousConfigObj,
        upgradeRequirement: upgradeRequirement,
        configurationAfterUpgrade: getAfterConfigObj,
        emailSubject: emailSubjects,
        reason: reasons,
      };
  
      // Send a POST request to the server with the new tracking modification
      const response = await fetch(`/api/requisition/${selectedRow.id}/trackingModification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackingModification }), // Pass the tracking modification object in the request body
      });
  
      // Parse the response as JSON
      const responseData = await response.json();
  
      if (response.ok) {

        const getModification =  setModificationTableList(responseData.trackingModification);
        setmodificationTable(getModification);
        setConfigurationObj(getAfterConfigObj);
        setOpen(false);
    
        // If the response is OK, do something

      } else {
        // If the response is not OK, handle the error
      }
    } catch (error) {
      console.error(error);
    }
    
  }
  

  const visibleColumns = columns.filter((column) => !column.hide);

  return (
    <div style={{ height: 540, width: '100%' }}>
    <Button variant="contained" color="primary" style={{ marginBottom : '20px' }} onClick={handleAddClick}>
      Add New
    </Button>
    <DataGrid
      rows={data}
      columns={visibleColumns}
      pageSize={5}
      checkboxSelection
      disableSelectionOnClick
      onRowDoubleClick={(row) => handleEditClick(row)}
      components={{
        Toolbar: GridToolbar,
      }}
    />
    
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}   sx={{ "& .MuiDialog-paper": { maxWidth: "900px" } }}
>
      <DialogTitle>{selectedRow ? 'Edit Row' : 'Add Row'}</DialogTitle>
      <DialogContent>
      <Grid container spacing={2}>

<Grid item xs={12}> 
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', borderBottom: '1px solid black' }}>
  Basic Info
</Typography>
</Box>
        </Grid>
        <Grid item xs={4}>
        <TextField
label="Server Name"
value={serverName}
onChange={(e) => setServerName(e.target.value)}
fullWidth
margin="normal"
error={!!serverNameError}
helperText={serverNameError}
/>

        </Grid>

        <Grid item xs={4}>
         
<TextField
label="IP Address"
value={ipAddress}
onChange={(e) => setIpAddress(e.target.value)}
fullWidth
margin="normal"
error={!!ipAddressError}
helperText={ipAddressError}
/>
        </Grid>
        <Grid item xs={4}>
          
          <TextField
label="Hosted At"
value={hostedAt}
onChange={(e) => setHostedAt(e.target.value)}
fullWidth
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
        value={client}
        onChange={(e) => {
          setClient(e.target.value);
          
          
        }}
        margin="normal"
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
              value={serverType}
              //onChange={(e) => setServerType(e.target.value)}
              onChange={(e) => {
                setServerType(e.target.value);
              }}
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
              value={esxiServer}
              onChange={(e) => setEsxiServer(e.target.value)
              }
              fullWidth
              margin="normal"
              error={!!esxiServerError}
              helperText={esxiServerError}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
             label="Usage"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              fullWidth
              margin="normal"
              error={!!usageError}
              helperText={usageError}
          />
        </Grid>
{/* <Grid item xs={4}>
<DatePicker
  label="Completion Date"
  value={completionDate}
  onChange={(date) => setCompletionDate(date)}
  fullWidth
  margin="normal"
  format="MM/dd/yyyy"
/>
</Grid>
    */}

        
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
    value={additionalInfo[index]}
    onChange={(e) =>
      setAdditionalInfo([
        ...additionalInfo.slice(0, index),
        e.target.value,
        ...additionalInfo.slice(index + 1),
      ])
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={!!emailError}
              helperText={emailError}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
             label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              margin="normal"
              error={!!reasonError}
              helperText={reasonError}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
             label="Requested By"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
              fullWidth
              margin="normal"
              error={!!requestedByError}
              helperText={requestedByError}
          />
        </Grid>
      </Grid>
<Grid item xs={12}>
<TableContainer component={Paper} style={{ border: '1px solid #ccc', marginTop:"20px" }}>
  <Table  aria-label="simple table" style={{ border: '1px solid #ccc' }}>
    <TableHead>
      <TableRow>
        <TableCell>Before Upgrade</TableCell>
        <TableCell align="center">After Upgrade</TableCell>
        <TableCell align="center">Requirement</TableCell>
        <TableCell align="center">Email Subject</TableCell>             
        <TableCell align="center">Reason</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {modificationtable.map((row) => (
        <TableRow>
          <TableCell align="center" style={{ border: 'px solid #ccc' , color:'black' }}>{row.configurationBeforeUpgrade}</TableCell>
          <TableCell align="center" style={{ border: '1px solid #ccc' , color:'black' }}>{row.configurationAfterUpgrade}</TableCell>
          <TableCell align="center" style={{ border: '1px solid #ccc' , color:'black' }}>{row.upgradeRequirement}</TableCell>
          <TableCell align="center" style={{ border: '1px solid #ccc' , color:'black' }}>{row.emailSubject}</TableCell>
          <TableCell align="center" style={{ border: '1px solid #ccc' , color:'black' }}>{row.reason}</TableCell>
          <TableCell align="right">
<Button variant="contained" color="primary" onClick={() => handleOpenDialog(row, true)}>Edit</Button>
</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<Button variant="contained" color="primary" onClick={() => handleOpenDialog(null, false)}>Add</Button>
</Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveClick} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleCloseDialog} sx={{ "& .MuiDialog-paper": { maxWidth: "800px"}}}>
<DialogTitle>{isEditMode ? "Edit Row" : "Add Row"}</DialogTitle>
<DialogContent>
<Grid item xs={12}> 
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', borderBottom: '1px solid black' }}>
 After Upgrade Configuration
</Typography>

</Box>

        </Grid>
{afterUpgradeInfoFields.map((field, index) => (
            <Grid item xs={4}> 

  <TextField 
    key={index}
    label={field}
    value={afterUpgrade[index]}
    onChange={(e) =>
      setAfterUpgrade([
        ...afterUpgrade.slice(0, index),
        e.target.value,
        ...afterUpgrade.slice(index + 1),
      
      ])
    }
    
    fullWidth
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

        <Grid item xs={6}>
          <TextField
             label="Requirement"
              value={upgradeRequirement}
              onChange={(e) => setUpgradeRequirement(e.target.value)}
              fullWidth
              margin="normal"
              // error={!!emailError}
              // helperText={emailError}
          />
        </Grid>

       
        <Grid item xs={6}>
          <TextField
             label="Email Subject"
              value={emailSubjects}
              onChange={(e) => setEmailSubjects(e.target.value)}
              fullWidth
              margin="normal"
              // error={!!reasonError}
              // helperText={reasonError}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
             label="Reason"
              value={reasons}
              onChange={(e) => setreasons(e.target.value)}
              fullWidth
              margin="normal"
              // error={!!reasonError}
              // helperText={reasonError}
          />
        </Grid>
</DialogContent>
<DialogActions>
<Button onClick={handleCloseDialog}>Cancel</Button>
<Button onClick={handleSave}>{isEditMode ? "Save" : "Add"}</Button>
</DialogActions>
</Dialog>

      </div>
    
  );
};

export default WorkoutDetails