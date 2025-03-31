import React from 'react';
import { useNavigate } from 'react-router-dom'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createUser } from '../../services/users.service';
import ErrorDialog from '../../components/ErrorAlert';

function UserCreate () {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    type: 'user'
  });
  const [hasError, setHasError] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = React.useCallback((field) => ({ target }) => {
    setValues(prevValues => ({ ...prevValues, [field]: target.value }));
  }, []);

  const handleSubmit = async () => {
    try {
      const message = await createUser(values);
      navigate(-1);
    } catch (e) {
      setHasError(true);
    }
  }

  const handleCloseErrorDialog = (_ev, reason) => {
    setHasError(false);
  }

  return (
    <Container>
      <Typography variant="h4">Criação de usuário</Typography>

      <Box sx={{ pt: 2 }}>
        <Card sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome"
            type='text'
            value={values.name}
            onChange={handleChange('name')}
          />
          <TextField
            label="E-mail"
            type='email'
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            label="Senha"
            type='password'
            value={values.password}
            onChange={handleChange('password')}
          />
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              label="Tipo"
              value={values.type}
              onChange={handleChange('type')}
            >
              <MenuItem value="user">Usuário</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="button"
            onClick={handleSubmit}
          >
            Registrar
          </Button>
        </Card>
      </Box>

      <ErrorDialog
        isVisible={hasError}
        message="Erro ao tentar criar usuário. Tente novamente mais tarde."
        onClose={handleCloseErrorDialog}
      />
    </Container>
  )
}

export default UserCreate;
