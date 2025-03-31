import React, { useCallback } from 'react';
import * as AuthService from '../../services/auth.service';
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from '../../hooks/useSnackbar';

const SignIn = () => {
  const [values, setValues] = React.useState({ email: 'admin@spsgroup.com.br', password: '1234' });
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { signIn } = useUser();
  const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

  const handleChange = useCallback((field) => ({ target: { value } }) => {
    setValues(prevValues => ({...prevValues, [field]: value }));
  }, []);

  const handleChangePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  }

  const handleSubmit = async () => {
    try {
      const user = await AuthService.signIn(values);
      signIn(user);
      navigate('/users')
    } catch (e) {
      showSnackbar({
        message: "Usuário ou Senha incorretos.",
        severity: "error"
      });
    }
  }

  return (
    <Container>
      <Typography variant="h3" component="h1">
        Login
      </Typography>

      <Box sx={{ pt: 2 }}>
        <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }} >
          <TextField
            label="E-mail"
            type='text'
            value={values.email}
            onChange={handleChange('email')}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="password-input">Senha</InputLabel>
            <OutlinedInput
              id="password-input"
              type={isPasswordVisible ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleChangePasswordVisibility}
                    edge="end"
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
            />
          </FormControl>

          <Button
            type='button'
            variant='contained'
            onClick={handleSubmit}
          >
            Entrar
          </Button>
        </Card>
      </Box>
    </Container>
  );
}

export default SignIn