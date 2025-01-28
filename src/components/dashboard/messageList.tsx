import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import { GenericServices } from '../../services/Generic.services';

interface MessageListProps {
  messages: string[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShare = () => {
    const linkToShare = `${GenericServices.getShareLink()}`; // Replace with the dynamic link if needed
    navigator.clipboard.writeText(linkToShare).then(() => {
      setSnackbarOpen(true); // Open the snackbar
    });
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return; // Prevent closing if the user clicks outside
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, margin: '0 auto' }}>
      <Paper
        elevation={3}
        sx={{
          bgcolor: 'background.paper',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
        }}
      >
        {/* Share Icon */}
        <Tooltip title="Copy link to clipboard" arrow>
          <IconButton
            onClick={handleShare}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: grey[700],
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Messages
        </Typography>
        {messages.length > 0 ? (
          <List sx={{ padding: 0 }}>
            {messages.map((message, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: grey[100],
                    },
                  }}
                >
                  <ListItemText primary={message} />
                </ListItem>
                {index < messages.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', marginTop: 2 }}
          >
            No messages to display.
          </Typography>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000} // 5 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MessageList;
