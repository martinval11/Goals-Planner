import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  OutlinedInput,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

import { useRef, useState } from 'react';

const GoalCreateModal = ({ openState, setGoalsData, goalsData }: any) => {
  // Goal structure
  const name = useRef<HTMLInputElement>(null);
  const motivation = useRef<HTMLInputElement>(null);
  const reward = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState('');

  const closeGoalModal = () => {
    openState(false);
  };

  const addGoal = () => {
    const data = {
      name: name.current?.value,
      motivation: motivation.current?.value,
      reward: reward.current?.value,
      date: date.current?.value,
      category: category,
    };

    localStorage.setItem('data', JSON.stringify([...goalsData, data]));
    setGoalsData([...goalsData, data]);
    closeGoalModal();
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <Dialog open={openState} onClose={closeGoalModal}>
      <DialogTitle>Create goal</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          inputRef={name}
          required
        />
        <TextField
          margin="dense"
          id="name"
          label="Motivation"
          type="text"
          fullWidth
          variant="outlined"
          inputRef={motivation}
          required
        />
        <TextField
          margin="dense"
          id="name"
          label="Reward"
          type="text"
          fullWidth
          variant="outlined"
          inputRef={reward}
          required
        />
        <OutlinedInput
          type="date"
          margin="dense"
          inputRef={date}
          fullWidth
          required
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            onChange={handleCategory}
            required
          >
            <MenuItem value="personal">Personal</MenuItem>
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="sport">Sport</MenuItem>
            <MenuItem value="family">Family</MenuItem>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="health">Health</MenuItem>
            <MenuItem value="money">Money</MenuItem>
            <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeGoalModal}>Cancel</Button>
        <Button onClick={addGoal}>Add Goal</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GoalCreateModal;
