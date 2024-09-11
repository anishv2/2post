import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),  
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

type OptionMenuProps={
    anchorEl: HTMLElement | null, 
    open: boolean, 
    slugId: string,
    handleClose: (event: React.MouseEvent)=>void,
    deleteHandler: (slugId: string)=>void,
    editHandler: (slugId: string)=>void
}

export default function OptionMenu({ anchorEl, slugId, open, handleClose, deleteHandler, editHandler }: OptionMenuProps) {    

    // const { data, isLoading, isError, error }=useQuery({
    //   query: ['edit'],
    //   queryFn: async()=>{}
    // });
    
  const handleDelete=(event: React.MouseEvent, slugId: string)=>{
    deleteHandler(slugId);
    handleClose(event);
  };

  const handleEdit=(event: React.MouseEvent, slugId: string)=>{
    editHandler(slugId);
    handleClose(event);
  };

  return (
    <div>
      {/* <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button> */}
      {/* {React.cloneElement(Component, {
        onClick: handleClick,
      })} */}

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e)=>handleEdit(e, slugId)} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={(e)=>handleDelete(e, slugId)} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
