import React from "react";
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../services/users.service'

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import DeleteUserDialog from "./DeleteUserDialog";

function UserItem ({ user }) { 
  const navigate = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false)

  const handleEditUser = () => {
    navigate(`/users/${user.id}`)
  }

  const handleDeleteUser = () => {
    setIsDeleteModalVisible(true);
  }

  const handleConfirmDeleteUser = async () => {
    try {
      const message = await deleteUser(user.id);

      // todo: show message
    } catch (e) {
      // todo: show error message
    }

    handleCloseDeleteModal();
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  }

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end" onClick={handleDeleteUser}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton onClick={handleEditUser}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItemButton>
      </ListItem>

      <DeleteUserDialog
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteUser}
        userName={user.name}
      />
    </>
  )
}

export default UserItem;
