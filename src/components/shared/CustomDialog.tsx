// MUI Imports
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[0],
  },
}));

export default CustomDialog;
