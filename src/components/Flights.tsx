import { Avatar, Box, Card, CardContent, Chip, Divider, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { FlightResponse } from '../types'
import FlightIcon from '@mui/icons-material/Flight'

type Props = {
    isLoading: boolean,
    flights?: FlightResponse
}

const Flights: React.FC<Props> = (props: Props) => {

    const { isLoading, flights } = props;

    if (isLoading) {
        return (
            <Stack gap={2} sx={{ py: 10 }}>
                {
                    [1, 2, 3, 4].map((item) => <Skeleton key={item} variant="rectangular" height={100} />)
                }
            </Stack>
        )
    }

    if (!flights?.data) {
        return (
            <Box sx={{ py: 10, minHeight: '50dvh' }}>
                <Typography variant="h5" color='text.secondary' textAlign="center">
                    Click on the search button to search for flights
                </Typography>
            </Box>
        )
    }

    if (!flights?.data?.itineraries?.length) {
        return (
            <Box sx={{ py: 10, minHeight: '50dvh' }}>
                <Typography variant="h5" color='text.secondary' textAlign="center">
                    No flights found
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ py: 10, minHeight: '50dvh' }}>
            {flights?.data?.itineraries.map((itinerary) => (
                <Card key={itinerary.id} sx={{ mb: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <Typography variant="h6" fontWeight="bold">
                                Total Price: {itinerary.price.formatted}
                            </Typography>
                            <Chip label={`${itinerary.legs.length} Legs`} color="primary" />
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        {itinerary.legs.map((leg) => (
                            <Box key={leg.id} sx={{ mb: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        src={leg.carriers.marketing[0].logoUrl}
                                        alt={leg.carriers.marketing[0].name}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {leg.carriers.marketing[0].name}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ mt: 1 }}
                                >
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {leg.origin.city} ({leg.origin.displayCode})
                                        </Typography>
                                        <Typography variant="body2">{new Date(leg.departure).toLocaleString()}</Typography>
                                    </Box>
                                    <FlightIcon sx={{ fontSize: 30 }} />
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {leg.destination.city} ({leg.destination.displayCode})
                                        </Typography>
                                        <Typography variant="body2">{new Date(leg.arrival).toLocaleString()}</Typography>
                                    </Box>
                                </Stack>

                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m | Stops: {leg.stopCount}
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}

export default Flights