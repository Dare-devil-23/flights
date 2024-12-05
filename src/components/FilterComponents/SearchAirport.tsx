import React, { useEffect, useState } from 'react';
import { Autocomplete, Avatar, Grid2, IconButton, TextField } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import apiService from '../../services';
import useDebounce from '../../hooks/useDebounce';
import { AirportInfo } from '../../types';
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
    onSelect: (airport: AirportInfo, destination?: boolean) => void;
    handleSwap?: () => void;
    suggestedFromLocation?: AirportInfo;
    suggestedToLocation?: AirportInfo;
    setSuggestedFromLocation?: React.Dispatch<React.SetStateAction<AirportInfo | undefined>>;
    setSuggestedToLocation?: React.Dispatch<React.SetStateAction<AirportInfo | undefined>>;
};

const SearchAirport: React.FC<Props> = (props: Props) => {
    const { onSelect, handleSwap, suggestedFromLocation, suggestedToLocation, setSuggestedFromLocation, setSuggestedToLocation } = props;

    const [fromLocation, setFromLocation] = useState<string>('');
    const [toLocation, setToLocation] = useState<string>('');
    const [suggestedFromLocations, setSuggestedFromLocations] = useState<AirportInfo[]>([]);
    const [suggestedToLocations, setSuggestedToLocations] = useState<AirportInfo[]>([]);
    const [fromLocationSelected, setFromLocationSelected] = useState<boolean>(false);
    const [toLocationSelected, setToLocationSelected] = useState<boolean>(false);
    const [isLoadingFrom, setIsLoadingFrom] = useState<boolean>(false);
    const [isLoadingTo, setIsLoadingTo] = useState<boolean>(false);

    const debouncedFrom = useDebounce(fromLocation);
    const debouncedTo = useDebounce(toLocation);

    const handleSearch = async (location: string, destination?: boolean) => {
        try {
            if (destination) {
                setIsLoadingTo(true);
            } else {
                setIsLoadingFrom(true);
            }
            const filters = { query: location };
            const result = await apiService.searchAirport(filters);
            if (result?.status) {
                if (destination) {
                    setSuggestedToLocations(result.data);
                } else {
                    setSuggestedFromLocations(result.data);
                }
            }
        } catch (err: any) {
            console.error(err.message || 'An error occurred');
        } finally {
            if (destination) {
                setIsLoadingTo(false);
            } else {
                setIsLoadingFrom(false);
            }
        }
    };

    useEffect(() => {
        if (debouncedFrom && !fromLocationSelected) {
            handleSearch(debouncedFrom, false);
        }
        if (debouncedTo && !toLocationSelected) {
            handleSearch(debouncedTo, true);
        }
    }, [debouncedFrom, debouncedTo, fromLocationSelected, toLocationSelected]);

    const handleFromLocationChange = (_: React.SyntheticEvent, newInputValue: string) => {
        setFromLocation(newInputValue);
        setFromLocationSelected(false);
    };

    const handleToLocationChange = (_: React.SyntheticEvent, newInputValue: string) => {
        setToLocation(newInputValue);
        setToLocationSelected(false);
    };

    const handleFromLocationSelect = (_: React.SyntheticEvent, value: AirportInfo | null) => {
        if (value) {
            onSelect(value, false);
            setFromLocationSelected(true);
        }
    };

    const handleToLocationSelect = (_: React.SyntheticEvent, value: AirportInfo | null) => {
        if (value) {
            onSelect(value, true);
            setToLocationSelected(true);
        }
    };

    const handleClearFromLocation = () => {
        setSuggestedFromLocation?.(undefined);
        setFromLocationSelected(false);
    };

    const handleClearToLocation = () => {
        setSuggestedToLocation?.(undefined);
        setToLocationSelected(false);
    };

    return (
        <>
            <Grid2 size={{ xs: 5.5, md: 3 }}>
                <Autocomplete
                    options={suggestedFromLocations}
                    onInputChange={handleFromLocationChange}
                    getOptionLabel={(option) => option.presentation.suggestionTitle}
                    isOptionEqualToValue={(option, value) => option.presentation.suggestionTitle === value.presentation.suggestionTitle}
                    value={suggestedFromLocation}
                    clearIcon={<ClearIcon fontSize={'small'} onClick={handleClearFromLocation} />}
                    noOptionsText={isLoadingFrom ? 'Loading...' : 'No locations found'}
                    loading={isLoadingFrom}
                    loadingText="Loading..."
                    renderInput={(params) => (
                        <TextField {...params} label="Where from?" />
                    )}
                    onChange={handleFromLocationSelect}
                />
            </Grid2>
            <Grid2 size={{ xs: 1, md: 0.5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={handleSwap}>
                    <Avatar>
                        <SwapHorizIcon />
                    </Avatar>
                </IconButton>
            </Grid2>
            <Grid2 size={{ xs: 5.5, md: 3 }}>
                <Autocomplete
                    options={suggestedToLocations}
                    getOptionLabel={(option) => option.presentation.suggestionTitle}
                    onInputChange={handleToLocationChange}
                    isOptionEqualToValue={(option, value) => option.presentation.suggestionTitle === value.presentation.suggestionTitle}
                    value={suggestedToLocation}
                    clearIcon={<ClearIcon fontSize={'small'} onClick={handleClearToLocation} />}
                    noOptionsText={isLoadingTo ? 'Loading...' : 'No locations found'}
                    loading={isLoadingTo}
                    loadingText="Loading..."
                    renderInput={(params) => (
                        <TextField {...params} label="Where to?" />
                    )}
                    onChange={handleToLocationSelect}
                />
            </Grid2>
        </>
    );
};

export default SearchAirport;