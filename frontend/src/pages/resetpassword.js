import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

const ResetPasswordPage = ({ match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/resetPassword', {
        token: match.params.token,
        password,
      });

      const { success, message } = response.data;

      if (success) {
        setSuccess(true);
      } else {
        setError(message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>
        <Typography variant="h4" align="center" mb={3}>Reset Password</Typography>
        {success ? (
          <Typography variant="body1" align="center">Password reset successfully.</Typography>
        ) : (
          <form onSubmit={handleSubmit} sx={{alignItems: 'center' }}>
            <TextField type="password" label="New Password" value={password} onChange={handlePasswordChange} sx={{ mb: 2 }} />
            <br/>
            <TextField type="password" label="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} sx={{ mb: 2 }} />
            {error && <Typography color="error">{error}</Typography>}
            <br/>
            <Button type="submit" variant="contained" color="inherit" sx={{ mt: 2 }}>Reset Password</Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default ResetPasswordPage;
