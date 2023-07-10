import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  Button,
  ButtonGroup,
  MenuItem,
  Menu,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/List';
import NewRequestDialog from '../components/AddNewRequest';
import ViewHistoryDialog from '../components/ViewHistory';
import NewHistoryDialog from '../components/AddNewHistory';
import greenFlag from '../pic/green-flag.png';
import yellowFlag from '../pic/yellow-flag.png';
import EditRequestDialog from '../components/EditRequest';

const WorkoutDetails = ({ workout }) => {

  const RenderActionsCell = (params) => {
    const row = params.row;
  
    const setModificationTableList = (list) => {
      const returnlist = list.map((c) => {
        return {
          configurationBeforeUpgrade: objectToString(c.configurationBeforeUpgrade),
          configBeforeupObj: c.configurationBeforeUpgrade,
          upgradeRequirement: c.upgradeRequirement,
          configurationAfterUpgrade: objectToString(c.configurationAfterUpgrade),
          configAfterUpgradeObj: c.configurationAfterUpgrade,
          emailSubject: c.emailSubject,
          reason: c.reason,
          updatedAt: c.updatedAt.toString('dd-MM-yyyy'),
          _id: c._id,
        };
      });
  
      return returnlist;
    };
  
    const objectToString = (obj) => {
      const entries = Object.entries(obj);
      const keyValuePairs = entries.map(([key, value]) => `${key}=${value}`);
      const result = keyValuePairs.join(', ');
      return result;
    };

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
  
    const handleViewHistoryClicks = (historyRow) => {
      //alert(historyRow.serverName);
      setViewHistoryDialog(true);
      const getModification =  setModificationTableList(historyRow.trackingModification);
      setmodificationTable(getModification)
      setAnchorEl(null);
    };
  
    const handleAddHistoryClicks = (addRow) => {
      setAddHistoryDialog(true);
      setSelectedRow(addRow.id);
      setAfterUpgradeInfoFields(additionalInfoFields);
      setModificationConfigurationObj(addRow.configAfterUpgradeObj);
      setUpgradeRequirement(addRow.upgradeRequirement);
      setEmailSubjects(addRow.emailSubject);
      setreasons(addRow.reason);
      setConfigurationObj(addRow.configObj);
      setAnchorEl(null);
    };
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const [anchorEl, setAnchorEl] = useState(null);



    return (
      <>
        <IconButton
          aria-label="Actions"
          onClick={handleMenuOpen}
          style={styless.iconButton}
        >
          <AttachFileIcon /> {/* Adjust the font size as needed */}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleEditClicks(row)} style={styless.menuItem}>
            <EditIcon style={{ fontSize: 15 }} />
            Edit Row
          </MenuItem>
          <MenuItem onClick={() => handleAddHistoryClicks(row)} style={styless.menuItem}>
            <AddIcon style={{ fontSize: 15 }} /> {/* Adjust the font size as needed */}
            Add History
          </MenuItem>
          <MenuItem onClick={() => handleViewHistoryClicks(row)} style={styless.menuItem}>
            <HistoryIcon style={{ fontSize: 15 }} /> {/* Adjust the font size as needed */}
            View History
          </MenuItem>
        </Menu>
      </>
    );
  };
  
  const columns = [
    { field: 'serverName', headerName: 'Server Name', width: 160 },
    { field: 'client', headerName: 'Client', width: 180},
    { field: 'serverType', headerName: 'Server Type' },
    { field: 'type', headerName: 'Type', hide: true },
    { field: 'ipAddress', headerName: 'IP Address', width: 150 , hide:true },
    { field: 'hostedAt', headerName: 'Hosted At', width: 150, hide:true },
    { field: 'configuration', headerName: 'Configuration', width: 450 },
    { field: 'updatedAt', headerName: 'Updated At', width: 130 },
    {
      field: 'status',
    headerName: 'Status',
    width: 70,
    renderCell: (params) => {
      const hasTrackingModification = Object.keys(params.row.trackingModification).length > 0;
      const flagImage = hasTrackingModification ? greenFlag : yellowFlag;

      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontSize: '1.5rem',
          }}
        >
          <img src={flagImage} alt="Flag" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
        </div>
      );
    },
  },
    { field: 'usage', headerName: 'Usage', width: 150, hide: true },
    { field: 'esxiServer', headerName: 'EsxiServer', width: 150, hide: true },
    { field: 'requestedBy', headerName: 'Requested By', width: 150 },
    { field: 'email', headerName: 'Email', width: 150, hide: true },
    { field: 'reason', headerName: 'Reason', width: 150, hide: true },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 80,
      renderCell: RenderActionsCell,
    },
  ];


  const handleEditClicks = (row) => {
    // Handle edit click
    
    setEditDialog(true);
    const selectedItem = serverTypeList.find(
      (c) => c.name === row.serverType
    );  
    const selectedClientItem = clientList.find(
      (c) => c.name === row.client
    );      
    setSelectedRow(row);
    row.client = selectedClientItem._id;
    row.serverType  = selectedItem._id;
  
    setClient(selectedClientItem._id);
  
    // Handle edit click
    setAnchorEl(null);
  };

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};
  
const handleMenuClose = () => {
  setAnchorEl(null);
};

  const styless = {
    iconButton: {
      padding: 4, // Adjust the padding as needed
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 8, // Adjust the gap as needed
      fontSize: 15,
    },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewHistoryDialog , setViewHistoryDialog] = useState(false);
  const [openAddHistoryDialog , setAddHistoryDialog] = useState(false);
  // const [dialogData, setDialogData] = useState({serverName : ''});
  const [clientList, setClientList] = useState([]);
  const [client, setClient] = useState('');
  const [serverTypeList, setServerTypeList] = useState([]);
  const [additionalInfoFields, setAdditionalInfoFields] = useState([]);
  const [afterUpgradeInfoFields, setAfterUpgradeInfoFields] = useState([]);
  const [afterUpgrade, setAfterUpgrade] = useState(Array(afterUpgradeInfoFields.length).fill(""));
  const [additionalInfo, setAdditionalInfo] = useState(Array(additionalInfoFields.length).fill(""));
  const [upgradeRequirement, setUpgradeRequirement] = useState('');
  const [emailSubjects, setEmailSubjects] = useState('');
  const [reasons, setreasons] = useState('');
  const [modificationtable , setmodificationTable] = useState([]);
  const visibleColumns = columns.filter((column) => !column.hide);
  const [selectedRow, setSelectedRow] = useState('');
  const [openEditDialog , setEditDialog] = useState(false);


  const handleOpenDialog = () => {
    // setDialogData({ serverName: "Rafay" });
    setOpenDialog(true);
  };

  const UpdateOpertaion = async (updatedRow) => {
    const response = await fetch('/api/requisition/'+updatedRow.id+'/update/', {
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

  const getConfigObject  = (feildInfo , objInfo) => {
    const additionalInfoObject = feildInfo.reduce((obj, field, index) => {
      obj[field] = objInfo[index];
      return obj;
    }, {});
  
    return additionalInfoObject;
  };
  
  const handleUpdateRequisition=(dialogData)=>
 {
  const EditRow = {
      serverName: dialogData.serverName,
      ipAddress: dialogData.ipAddress,
      //serverType:serverType,
      client : client,
      usage: dialogData.usage,
      hostedAt: dialogData.hostedAt,
      esxiServer: dialogData.esxiServer,
      requestedBy: dialogData.requestedBy,
      type: "New",    
      //configuration: getConfigObj,
      email: dialogData.email,
      reason: dialogData.reason,
      completionDate : "2023-04-01",
      subject : "test",
      id :dialogData.id
      
    };
    UpdateOpertaion(EditRow);
    handleEditCloseDialog();
 }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleViewHistoryCloseDialog = () =>{
      setViewHistoryDialog(false);
  };

  const handleEditHistoryData = (row,isEditMode) => {
    
  };


  const handleEditCloseDialog = () => {
    setEditDialog(false);
  };

  const handleAddHistoryCloseDialog = () =>{
      setAddHistoryDialog(false);
  };

  const SaveHistoryOpertaion = async (trackingModification) =>{
    try {
    const response = await fetch(`/api/requisition/${selectedRow}/trackingModification/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ trackingModification }), // Pass the tracking modification object in the request body
    });

    // Parse the response as JSON
    const responseData = await response.json();

    if (response.ok) {

      // const getModification =  setModificationTableList(responseData.trackingModification);
      // setmodificationTable(getModification);
      // setConfigurationObj(getAfterConfigObj);
      const response = await fetch('/api/requisition/getData/');
      const data = await response.json();
      const gridData = SetGridData(data.Tracking)
      setData(gridData)
      setAddHistoryDialog(false);
  
      // If the response is OK, do something

    } else {
      // If the response is not OK, handle the error
    }
  }catch (error) {
    console.error(error);
  }
};

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

 const handleSaveHistoryData = (dialogData) =>{
  const getPerviousConfigObj = getConfigObject(additionalInfoFields , additionalInfo);
  const getAfterConfigObj = getConfigObject(additionalInfoFields , dialogData.additionalInfo);
  const updatedConfigAfterUpgrade = {};
  for (const key in getAfterConfigObj) {
    if (getAfterConfigObj[key] === undefined) {
      updatedConfigAfterUpgrade[key] = getPerviousConfigObj[key];
    } else {
      updatedConfigAfterUpgrade[key] = getAfterConfigObj[key];
    }
  }
  const trackingModification = {
    configurationBeforeUpgrade: getPerviousConfigObj,
    upgradeRequirement: dialogData.upgradeRequirement,
    configurationAfterUpgrade: updatedConfigAfterUpgrade,
    emailSubject: dialogData.emailSubject,
    reason: dialogData.reason,
  };
  SaveHistoryOpertaion(trackingModification);
 };

  const handleSaveData = (dialogData) => {
    const getConfigObj = getConfigObject(additionalInfoFields , dialogData.additionalInfo)
    const newRow = {
      serverName: dialogData.serverName,
      ipAddress: dialogData.ipAddress,
      serverType: dialogData.serverType,
      client : dialogData.client,
      usage: dialogData.usage,
      hostedAt: dialogData.hostedAt,
      esxiServer: dialogData.esxiServer,
      requestedBy: dialogData.requestedBy,
      type: "New",    
      configuration: getConfigObj,
      email: dialogData.email,
      reason: dialogData.reason,
      completionDate : "2023-04-01",
      subject : "test",
      
    };
    SaveOpertaion(newRow);
    handleCloseDialog();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/requisition/getData/');
      const data = await response.json();
      setClientList(data.clientList);
      setServerTypeList(data.serverTypeList);
      setAdditionalInfoFields(data.configurationList[0].fields);
      const gridData = SetGridData(data.Tracking);
      setData(gridData);
    };
    fetchData();
  }, []);


  const SetGridData = (dataGrid) => {
    const list = dataGrid.map((c) => {
      return {
        id: c._id,
        client: c.client.name,
        serverName: c.serverName,
        ipAddress: c.ipAddress,
        serverType: c.serverType.name,
        usage: c.usage,
        hostedAt: c.hostedAt,
        esxiServer: c.esxiServer,
        requestedBy: c.requestedBy,
        type: c.type,
        configuration: c.configuration,
        email: c.email,
        configObj: c.configObj,
        reason: c.reason,
        trackingModification: c.trackingModification,
        updatedAt: c.updatedAt
        // Add other properties as needed
      };
    });

    return list;
  };


  const pageSize = 10;
  return (
    <div style={{ height: 540, width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px' }}
        onClick={handleOpenDialog}
      >
        Add New
      </Button>
      <div style={{ height: 650, width: "100%" , overflow:'hidden' , border: '0px', marginLeft: '20px' }}>
      <DataGrid
        rows={data}
        columns={visibleColumns}
        pageSize={pageSize}
        autoPageSize
        density="compact"
        hideFooterSelectedRowCount
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        className="data-grid"
      />

      </div>
      <NewRequestDialog
        openDialog={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveData}
        clientList={clientList}
        serverTypeList={serverTypeList}
        additionalInfoFields={additionalInfoFields}
        // dialogData={dialogData}
      />
       <EditRequestDialog
        openDialog={openEditDialog}
        onClose={handleEditCloseDialog}
        onSave={handleUpdateRequisition}
        clientList={clientList}
        setClient={setClient}
        selectedRow = {selectedRow}
        serverTypeList={serverTypeList}
        additionalInfoFields={additionalInfoFields}
        // dialogData={dialogData}
      />
      <ViewHistoryDialog
        openDialog={openViewHistoryDialog}
        onClose={handleViewHistoryCloseDialog}
        modificationtable = {modificationtable}
        onEdit={handleEditHistoryData}
      />
      <NewHistoryDialog
        openDialog={openAddHistoryDialog}
        onClose={handleAddHistoryCloseDialog}
        afterUpgradeInfoFields = {afterUpgradeInfoFields}
        onSave={handleSaveHistoryData}
      />
    </div>
  );
}

export default WorkoutDetails;
