import { Box, Button, Grid, Grid2, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackendServices } from '../../services/Backend.services';
import { AxiosResponse } from 'axios';

interface CheckUserIdResponseType {
    username: string
}

interface RecordMessageProps { }
export const RecordMessage: React.FC<RecordMessageProps> = () => {
    const { userUMID } = useParams<{ userUMID: string }>();
    const [inputValue, setInputValue] = useState("");
    const [msgUser, setMsgUser] = useState("");

    useEffect(() => {
        if (userUMID) {
            BackendServices.checkUserId(userUMID).then((res: AxiosResponse<CheckUserIdResponseType>) => {
                console.log('res', res?.data?.username)
                setMsgUser(res?.data?.username || "");
            }).catch((err) => {
                console.log("res", err)
            })
        }
    })

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert(`Submitted value: ${inputValue}`);
        if(msgUser && inputValue){
            BackendServices.postMsgToUser(msgUser, inputValue).then((res: any) => {
                console.log("msgPosted:", res)
                setInputValue("")
            }).catch((res) => {
                console.log("msgPosted:", res)
            })
        }
    };

    return (
        msgUser ?
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                px: 2,
            }}
        >
            <Grid
                container
                spacing={2}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                <Grid2>
                    <Typography>
                        Write An AnoText for {msgUser}.
                    </Typography>
                </Grid2>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Enter text"
                        variant="outlined"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box> : 
        <Box>
                <Typography> Invalid URL.</Typography>
        </Box>

    );
}