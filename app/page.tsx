'use client';

import {
  Fab,
  Box,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  LinearProgressProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';

import Nav from '@/components/Nav/Nav';
import GoalInfoModal from '@/components/GoalModals/GoalInfoModal';
import GoalCreateModal from '@/components/GoalModals/GoalCreateModal';

import daysLeft from '@/lib/daysLeft';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const [goals, setGoals]: any = useState([]);
  const [openAddGoal, setOpenAddGoal] = useState(false);

  const openGoalModal = () => {
    setOpenAddGoal(true);
  };

  const GoalCard = ({ goal }: any) => {
    const [openInfoGoal, setOpenInfoGoal] = useState(false);

    const openGoalInfoModal = () => {
      setOpenInfoGoal(true);
    };

    const closeGoalInfoModal = () => {
      setOpenInfoGoal(false);
    };

    const deleteGoal = (event: any) => {
      const confirmDeleteGoal = confirm(
        'Are you sure you want to delete this item?'
      );

      if (confirmDeleteGoal) {
        const goalName = event.target.id;
        const filterGoals = goals.filter((goal: any) => goal.name !== goalName);
        localStorage.setItem('data', JSON.stringify(filterGoals));
        return setGoals(filterGoals);
      }
      return null;
    };

    const renameGoal = (event: any) => {
      const oldGoalName = event.target.id;
      const newGoalName = prompt('Type your new goal name', oldGoalName);

      if (newGoalName) {
        const goalIndex = goals.findIndex(
          (goal: any) => goal.name === oldGoalName
        );
        goals.at(goalIndex).name = newGoalName;

        localStorage.setItem('data', JSON.stringify(goals));
        return setGoals([...goals]);
      }
    };

    const LinearProgressWithLabel = (
      props: LinearProgressProps & { value: number }
    ) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Box>
      );
    };

    const calculatePercentageCompletedSteps = () => {
      const steps = goal.steps;
      const uncompletedSteps = steps.filter((step: any) => step.done !== true);
      const completedSteps = steps.filter((step: any) => step.done === true);

      if (
        (uncompletedSteps.length === 0 && completedSteps.length === 0) ||
        (uncompletedSteps.length === 1 && completedSteps.length === 0)
      ) {
        return 0;
      }

      if (uncompletedSteps.length > completedSteps.length && completedSteps.length === 0) {
        return 0;
      }

      const percentage = (100 / (uncompletedSteps.length + 1)).toString();
      return parseInt(percentage);
    };

    return (
      <>
        <Card key={goal.name} sx={{ cursor: 'pointer', width: '300px' }}>
          <CardContent>
            <div onClick={openGoalInfoModal}>
              <Typography variant="h5" component="div">
                {goal.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                {daysLeft(goal.date)}
              </Typography>
              <LinearProgressWithLabel
                value={calculatePercentageCompletedSteps()}
              />
            </div>
            <Button onClick={deleteGoal} id={goal.name}>
              Delete
            </Button>
            <Button onClick={renameGoal} id={goal.name}>
              Rename
            </Button>
          </CardContent>
        </Card>

        {openInfoGoal && (
          <GoalInfoModal
            goal={goal}
            openState={openGoalInfoModal}
            closeState={closeGoalInfoModal}
            changeData={setGoals}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    const data = localStorage.getItem('data');

    if (data !== null) {
      setGoals(JSON.parse(data));
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
      <Box p={2}>
        <h1>My Goals</h1>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          {!goals?.length ? (
            <h3>No goals</h3>
          ) : (
            goals.map((goal: any) => <GoalCard goal={goal} key={goal.name} />)
          )}
        </Box>

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

        {openAddGoal && (
          <GoalCreateModal
            openState={setOpenAddGoal}
            setGoalsData={setGoals}
            goalsData={goals}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
