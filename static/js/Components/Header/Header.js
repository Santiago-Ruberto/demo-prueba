import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { Container, Title } from './styles'


const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 400px)': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10
    }
  },
  brand: {
    height: '60%',
    width: 80
  },
  brandsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  menu: {
    color: `${theme.palette.orange.main} !important`,
    justifyContent: 'flex-end',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const Header = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event).key === 'Tab' ||
        (event).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOnMenuItemClicked = (url) => {
    navigate(url)
  }

  const renderIcon = (url) => {
    switch (url) {
      case 'faqs':
        return <HelpIcon />
      case 'profile':
        return <AccountCircleIcon />
      case '':
        return <HomeIcon />
      default:
        return null
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          [
            {
              'title': 'Inicio',
              'url': ''
            },
            {
              'title': 'Perfil',
              'url': 'profile'
            },
            {
              'title': 'Faq´s',
              'url': 'faqs'
            }
          ].map((item, index) => (
            <ListItem button key={item.title} onClick={() => handleOnMenuItemClicked(item.url)}>
              <ListItemIcon>
                {renderIcon(item.url)}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
      </List>
    </Box>
  );


  const classes = useStyles()
  return (
    <>
      <Container>
        <div className={classes.content}>
          <Title>compar-e</Title>
          <ListItemIcon onClick={toggleDrawer('right', true)} className={classes.menu}>
            <MenuIcon fontSize='large' />
          </ListItemIcon>
        </div>
      </Container>
      <Fragment key={'right'}>

        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </Fragment>
    </>
  )
}

export default Header