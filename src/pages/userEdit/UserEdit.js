import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateUser, getUserById } from '../../services/users.service';
import ErrorDialog from '../../components/ErrorAlert';

function UserEdit () {
  const [name, setName] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getUserById(userId);
  
        setName(data.name);
      } catch (e) {
        setHasError(true);
      }
    })();
  }, [userId, navigate])

  const handleChangeName = ({ target }) => {
    setName(target.value);
  }

  const handleSubmit = async () => {
    try {
      const message = await updateUser(userId, { name });
      navigate(-1);
    } catch (e) {

      console.log(e)
    }
  }

  const handleCloseErrorDialog = (_ev, reason) => {
    setHasError(false);

    if (reason === "timeout") {
      navigate(-1);
    }
  }

  return (
    <Container>
      <Typography variant="h4">Edição de usuário</Typography>

      <Box sx={{ pt: 2 }}>
        <Card sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome"
            type='text'
            value={name}
            onChange={handleChangeName}
            disabled={hasError}
          />

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={hasError}
          >
            Atualizar
          </Button>
        </Card>
      </Box>

      <ErrorDialog
        isVisible={hasError}
        message="Erro ao buscar usuário."
        onClose={handleCloseErrorDialog}
      />
    </Container>
  )
}

export default UserEdit;
