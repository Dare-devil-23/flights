import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import Filter from './Filter'
import apiService, { FilterParams } from '../services';
import Flights from './Flights';
import { FlightResponse } from '../types';

const HeroSection: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState<FlightResponse>();

    const handleSearchFlights = async (filters: FilterParams) => {
        setIsLoading(true);
        try {
            const result = await apiService.getFlights(filters);
            if (result?.data) {
                setFlights(result);
            }
        } catch (err: any) {
            console.error(err.message || "An error occurred");
        }
        setIsLoading(false);
    };

    const handleSearch = (filters: FilterParams) => {
        handleSearchFlights(filters);
    }

    return (
        <Box bgcolor={'#202124'}>
            <Container
                component="section"
                sx={{
                    py: 0,
                    px: {
                        xs: 0,
                        md: 10
                    }
                }}
            >
                <img alt="Flights" src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg" />
                <Typography variant='h4' align='center' mt="-50px" gutterBottom>
                    Flights
                </Typography>
                <Filter onSearch={handleSearch} />
                <Flights isLoading={isLoading} flights={flights} />
            </Container>
        </Box>
    )
}

export default HeroSection