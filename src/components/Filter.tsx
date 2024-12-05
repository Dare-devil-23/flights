import {
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Select,
    TextField,
    Grid2,
    InputAdornment,
    Button,
    Box
} from '@mui/material';
import React, { useState } from 'react';
import { tripTypes, cabinTypes, userTypes } from '../constants';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonIcon from '@mui/icons-material/Person';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import SearchAirport from './FilterComponents/SearchAirport';
import { AirportInfo } from '../types';
import { FilterParams } from '../services';

interface Props {
    onSearch: (filters: FilterParams) => void
}

interface Passengers {
    adults: number;
    children: number;
    infants: number;
}

const Filter: React.FC<Props> = (props: Props) => {
    const { onSearch } = props;
    const [tripType, setTripType] = useState<string>(tripTypes[0].value);
    const [cabinType, setCabinType] = useState<string>('economy');

    const [departureDate, setDepartureDate] = useState<Dayjs | null>();
    const [returnDate, setReturnDate] = useState<Dayjs | null>();
    const [passengers, setPassengers] = useState<Passengers>({
        adults: 1,
        children: 0,
        infants: 0,
    });
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [suggestedFromLocation, setSuggestedFromLocation] = useState<AirportInfo>();
    const [suggestedToLocation, setSuggestedToLocation] = useState<AirportInfo>();

    const totalPassengers = passengers.adults + passengers.children + passengers.infants;

    const handlePassengerChange = (type: keyof Passengers, increment: boolean) => {
        setPassengers((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + (increment ? 1 : -1)),
        }));
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onSelectLocation = (airport: AirportInfo, destination?: boolean) => {
        if (destination) {
            setSuggestedToLocation(airport);
        } else {
            setSuggestedFromLocation(airport);
        }
    };

    const handleSwap = () => {
        const temp = suggestedFromLocation;
        setSuggestedFromLocation(suggestedToLocation);
        setSuggestedToLocation(temp);
    };

    const handleSearch = () => {
        onSearch({
            originSkyId: suggestedFromLocation?.skyId,
            destinationSkyId: suggestedToLocation?.skyId,
            originEntityId: suggestedFromLocation?.entityId,
            destinationEntityId: suggestedToLocation?.entityId,
            cabinClass: cabinType,
            adults: passengers.adults.toString(),
            children: passengers.children.toString(),
            infants: passengers.infants.toString(),
            date: departureDate?.format('YYYY-MM-DD'),
            returnDate: tripType === 'roundTrip' ? returnDate?.format('YYYY-MM-DD') : undefined,
            sortBy: 'best',
            currency: 'USD',
            market: 'en-US',
            countryCode: 'US'
        });
    }

    return (
        <Paper sx={{ p: 4 }}>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 8, md: 3 }}>
                    <Select
                        size="small"
                        variant="standard"
                        label="Trip Type"
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value)}
                        startAdornment={
                            tripType === 'roundTrip' ? (
                                <SwapHorizIcon sx={{ mr: 1 }} />
                            ) : (
                                <ArrowRightAltIcon sx={{ mr: 1 }} />
                            )
                        }
                        sx={{ width: '100%' }}
                    >
                        {tripTypes.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid2>

                <Grid2 size={{ xs: 4, md: 1 }}>
                    <TextField
                        size="small"
                        variant="standard"
                        value={totalPassengers}
                        onClick={handleMenuOpen}
                        sx={{ cursor: 'pointer', width: '100%' }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <List sx={{ width: 250, px: 2, py: 1 }}>
                            {userTypes.map((item) => (
                                <ListItem key={item.value} disablePadding>
                                    <ListItemText sx={{ width: 100 }}>
                                        {item.name}
                                    </ListItemText>
                                    <IconButton
                                        onClick={() =>
                                            handlePassengerChange(
                                                item.value as keyof Passengers,
                                                false
                                            )
                                        }
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <ListItemText
                                        sx={{ width: 30, textAlign: 'center' }}
                                        primary={
                                            passengers[item.value as keyof Passengers]
                                        }
                                    />
                                    <IconButton
                                        onClick={() =>
                                            handlePassengerChange(
                                                item.value as keyof Passengers,
                                                true
                                            )
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Menu>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 3 }}>
                    <Select
                        size="small"
                        variant="standard"
                        label="Cabin Type"
                        value={cabinType}
                        onChange={(e) => setCabinType(e.target.value)}
                        sx={{ width: '100%' }}
                    >
                        {cabinTypes.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid2>
            </Grid2>
            <Grid2 alignItems={'center'} container spacing={2} sx={{ mt: 4 }}>
                <SearchAirport
                    onSelect={onSelectLocation}
                    handleSwap={handleSwap}
                    suggestedFromLocation={suggestedFromLocation}
                    suggestedToLocation={suggestedToLocation}
                    setSuggestedFromLocation={setSuggestedFromLocation}
                    setSuggestedToLocation={setSuggestedToLocation}
                />
                <Grid2 size={{ xs: 12, md: 5.5 }}>
                    {
                        tripType === 'roundTrip' ? (
                            <Stack direction="row" spacing={2}>
                                <DatePicker
                                    label="Departure Date"
                                    value={departureDate}
                                    onChange={(newValue) => setDepartureDate(newValue)}
                                    disablePast
                                />
                                <DatePicker
                                    label="Return Date"
                                    value={returnDate}
                                    onChange={(newValue) => setReturnDate(newValue)}
                                    minDate={departureDate ? departureDate : undefined}
                                    disablePast
                                />
                            </Stack>
                        ) : (
                            <DatePicker
                                label="Departure Date"
                                value={departureDate}
                                sx={{ width: '100%' }}
                                onChange={(newValue) => setDepartureDate(newValue)}
                            />
                        )
                    }
                </Grid2>
            </Grid2>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleSearch} startIcon={<SearchIcon />} variant="contained" sx={{ mb: -6, mt: 4 }}>
                    Search
                </Button>
            </Box>
        </Paper>
    );
};

export default Filter;
