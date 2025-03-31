import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateUser, getUserById } from '../../services/users.service';
import { useSnackbar } from '../../hooks/useSnackbar';

function UserEdit () {
  const [name, setName] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getUserById(userId);
  
        setName(data.name);
      } catch (e) {
        setHasError(true)
      }
    })();
  }, [userId, navigate, showSnackbar])

  const handleChangeName = ({ target }) => {
    setName(target.value);
  }

  const handleSubmit = async () => {
    try {
      const message = await updateUser(userId, { name });
      showSnackbar({ message, severity: "success" });
      navigate(-1);
    } catch (e) {
      showSnackbar({
        message: "Erro ao tentar atualizar usuário, tente novamente mais tarde.",
        severity: "error"
      });
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <Container>
      <Typography variant="h4">Edição de usuário</Typography>

      {hasError ? (
        <Box sx={{ p:2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Error ao buscar usuário, tente novamente mais tarde.</Typography>

          <Button
            type='text'
            onClick={handleGoBack}
          >
            Voltar
          </Button>
        </Box>
      ) : (
      <Box sx={{ pt: 2 }}>
        <Card sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome"
            type='text'
            value={name}
            onChange={handleChangeName}
          />

          <Button
            type="button"
            onClick={handleSubmit}
          >
            Atualizar
          </Button>
        </Card>
      </Box>
      )}
    </Container>
  )
}

export default UserEdit;
