import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { grey } from '@mui/material/colors';

interface MessageListProps {
  messages: string[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, margin: '0 auto' }}>
      <Paper
        elevation={3}
        sx={{
          bgcolor: 'background.paper',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
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
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', marginTop: 2 }}>
            No messages to display.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default MessageList;
