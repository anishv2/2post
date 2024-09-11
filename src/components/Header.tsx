import { MouseEvent, ChangeEvent, FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import FeedIcon from '@mui/icons-material/Feed';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserProfile from '@/shared/widgets/UserProfile';
import { IAuth } from '@/shared/interfaces/miscalleneous';
import { handleLogout } from '@/redux/slices/auth';
import { useAppDispatch } from '@/redux/store/store';
import { handleSnackBar } from '@/redux/slices/snackbar';
import { getNameFirstLetter } from '@/shared/name.util';
import { ROUTES } from '@/routes/routeslinks';
import useMediaQuery from '@mui/material/useMediaQuery';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar:FC<{ auth:IAuth }> = ({ auth })=> {
  const dispatch = useAppDispatch();
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  const [anchorEl, setAnchorEl] = useState< null| HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState< null| HTMLElement>(null);
  const [query, setQuery]=useState<string>(searchParams.get('q') as string);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const matches = useMediaQuery('(max-width:600px)');

  const { CREATE_POST, FEEDS, PROFILE } = ROUTES;

  const handleSearch=(event: ChangeEvent<HTMLInputElement>)=>{
    setQuery(event.target.value);
    if (event.target.value!==''){
      navigate(`/user/search?q=`+event.target.value.toLowerCase().trim());
    }
  }

  const handleProfileMenuOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event:MouseEvent<HTMLAnchorElement>) => {
    setMobileMoreAnchorEl(event.currentTarget as HTMLElement);
  };

  const logout=()=>{
    dispatch(handleSnackBar({ snackOpen: true, snackType: "success", snackMessage: "Logging out..." }));
    dispatch(handleLogout());
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
      onClick={
        ()=>navigate(`/user/${FEEDS}`)
      }
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          {/* <Badge badgeContent={4} color="error"> */}
            <FeedIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Feeds</p>
      </MenuItem>
      <MenuItem
      onClick={
        ()=>navigate(`/user/${CREATE_POST}`)
      }
      >
        <IconButton 
        size="large"
        aria-label="show 4 new mails" 
        color="inherit"
        >
          {/* <Badge badgeContent={4} color="error"> */}
            <AddCircleIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Create post</p>
      </MenuItem>
      <MenuItem
       onClick={
        ()=>navigate(`/user/${PROFILE}`)
      }
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
         
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {matches && <IconButton
            href=''
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            aria-controls={mobileMenuId}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            2 Post
          </Typography>
          {auth.isAuthenticated && <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search users…"
              value={query}
              onChange={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>}

            {auth.isAuthenticated ? <><Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
             { !matches && <IconButton
              href=''
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
                <UserProfile name={getNameFirstLetter(auth?.firstName)}/>
              </IconButton>}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                href=''
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Box>
            </> : ""}

        </Toolbar>
      </AppBar>
      {auth.isAuthenticated ? renderMobileMenu : ""}
      {auth.isAuthenticated ? renderMenu : ""}
    </Box>
  );
}

export default Navbar;