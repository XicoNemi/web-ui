import React from 'react';

// MUI Imports
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Project Imports
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TodoItem({ todo, onDelete, onToggle }: TodoItemProps): React.JSX.Element {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            onDelete(todo.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        tabIndex={-1}
        disableRipple
        onChange={() => {
          onToggle(todo.id);
        }}
      />
      <ListItemText primary={todo.title} secondary={todo.description} />
    </ListItem>
  );
}
