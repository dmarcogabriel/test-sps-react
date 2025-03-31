import React from "react";
// eslint-disable-next-line no-unused-vars
import { getUsers } from "../../services/users.service";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/List';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import UserItem from "./UserItem";

function Users() {
  const [userList, setUserList] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  const navigate = useNavigate();

  const loadUsers = React.useCallback(async () => {
    try {
      const users = await getUsers();
      setUserList(users);
    } catch (e) {
      setHasError(true);
    }
  }, []);

  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRegisterNewUser = () => {
    navigate('/users/register');
  }

  return (
    <Container>
      <Typography variant="h4" component="h1">Usuários</Typography>
      <Button variant="text" onClick={handleRegisterNewUser}>
        Cadastrar Novo Usuário
      </Button>

      <Box>
        {hasError && (
          <Typography>Erro ao Buscar Usuários</Typography>
        )}
        {!hasError && !userList.length && (
          <Typography>Nenhum usuário cadastrado.</Typography>
        )}

        <List>
          {userList.map(user => (
            <UserItem
              key={String(user.id)}
              user={user}
              onUserDelete={loadUsers}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Users;
