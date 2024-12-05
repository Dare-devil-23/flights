import React, { useState } from 'react'
import { AppBar, Button, Chip, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LuggageIcon from '@mui/icons-material/Luggage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import HouseIcon from '@mui/icons-material/House';

const links = [
    {
        label: 'Travel',
        url: '#',
        icon: <LuggageIcon />
    },
    {
        label: 'Explore',
        url: '#',
        icon: <TravelExploreIcon />
    },
    {
        label: 'Flights',
        url: '/',
        icon: <FlightIcon />,
        active: true
    },
    {
        label: 'Hotels',
        url: '#',
        icon: <HotelIcon />
    },
    {
        label: 'Holiday rentals',
        url: '#',
        icon: <HouseIcon />
    }
]

const Header: React.FC = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    return (
        <>
            <AppBar position='static'>
                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setIsSideBarOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" component="div">
                        Flights
                    </Typography>
                    <Stack direction="row" alignItems='center' spacing={1} sx={{ flexGrow: 1, ml: 2, display: { xs: 'none', md: 'flex' } }}>
                        {links.map((link) => (
                            <Chip
                                key={link.label}
                                label={link.label}
                                component='a'
                                href={link.url}
                                clickable
                                color={link.active ? 'primary' : 'default'}
                                variant={link.active ? 'filled' : 'outlined'}
                                icon={link.icon}
                                size='small'
                                sx={{ px: 2, py: 2, borderColor: '#424242' }}
                            />
                        ))}
                    </Stack>
                    <Button variant='contained' color='primary' sx={{ textTransform: 'none', px: 4, py: 1, ml: 'auto' }}>
                        <Typography variant='subtitle2' component='span'>
                            Sign In
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer sx={{ width: 250 }} open={isSideBarOpen} onClose={() => setIsSideBarOpen(false)}>
                <List>
                    {links.map((item, index) => (
                        <ListItem key={index} >
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
}

export default Header