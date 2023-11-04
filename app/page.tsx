'use client';

import {
  Fab,
  Box,
  ThemeProvider,
  createTheme,
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
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useRef, useEffect } from 'react';

import Nav from '@/components/Nav/Nav';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [openInfoGoal, setOpenInfoGoal] = useState(false);

  // Goal structure
  const name = useRef<HTMLInputElement>(null);
  const motivation = useRef<HTMLInputElement>(null);
  const reward = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState('');

  const openGoalModal = () => {
    setOpenAddGoal(true);
  };

  const closeGoalModal = () => {
    setOpenAddGoal(false);
  };

  const openGoalInfoModal = () => {
    setOpenInfoGoal(true);
  };

  const closeGoalInfoModal = () => {
    setOpenInfoGoal(false);
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const addGoal = () => {
    const data = {
      name: name.current?.value,
      motivation: motivation.current?.value,
      reward: reward.current?.value,
      date: date.current?.value,
      category: category,
    };

    localStorage.setItem('data', JSON.stringify(data));
  };

  const GoalInfoModal = ({ goal }: any) => {
    function CustomTabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
      <Dialog open={openGoalInfoModal} onClose={closeGoalInfoModal} fullWidth>
        <DialogTitle>{goal.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Description" {...a11yProps(0)} />
              <Tab label="Steps" {...a11yProps(1)} />
              <Tab label="Notes" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <p>Motivation: {goal.motivation}</p>

            <p>Reward: {goal.reward}</p>

            <p>Date: {goal.date}</p>

            <p>Category: {goal.category}</p>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </DialogContent>
      </Dialog>
    );
  };

  const GoalModal = () => {
    return (
      <Dialog open={openAddGoal} onClose={closeGoalModal}>
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

  const daysLeft = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const cmas = new Date(today.getFullYear(), date.getMonth(), date.getDate());

    const oneDay = 1000 * 60 * 60 * 24;

    return (
      Math.ceil((cmas.getTime() - today.getTime()) / oneDay) + ' days left'
    );
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    setGoals([JSON.parse(data || '{}')]);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
      <Box p={2}>
        <h1>My Goals</h1>

        {goals.map((goal: any) => (
          <>
            <Card
              key={goal.name}
              onClick={openGoalInfoModal}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {goal.name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  {daysLeft(goal.date)}
                </Typography>
              </CardContent>
            </Card>

            {openInfoGoal && <GoalInfoModal goal={goal} />}
          </>
        ))}

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 22,
            right: 22,
          }}
          onClick={openGoalModal}
        >
          <AddIcon />
        </Fab>

        {openAddGoal && <GoalModal />}
      </Box>
    </ThemeProvider>
  );
}
