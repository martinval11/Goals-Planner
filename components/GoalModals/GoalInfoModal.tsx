import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tab,
  Tabs,
  Typography,
  Fab,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function GoalInfoModal({ goal, openState, closeState }: any) {
  const [steps, setSteps]: any = useState([]);
  const [notes, setNotes]: any = useState([]);
  const [value, setValue] = useState(0);

  const CustomTabPanel = (props: TabPanelProps) => {
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
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const ControlledCheckbox = ({ label }: any) => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    return (
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
      />
    );
  }

  const addStep = () => {
    const stepName = prompt('Enter new step name');
    setSteps([...steps, stepName]);
  };

  const addNote = () => {
    const note = prompt('Type here your note');
    setNotes([...notes, note]);
    console.log(notes);
  };

  return (
    <Dialog open={openState} onClose={closeState} fullWidth>
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
        <CustomTabPanel value={value} index={1} sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {steps.length === 0 ? (
              <span>No steps</span>
            ) : (
              steps.map((step: string, index: number) => (
                <ControlledCheckbox key={index} label={step} />
              ))
            )}
          </Box>

          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 22,
            }}
            onClick={addStep}
          >
            <AddIcon />
          </Fab>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} sx={{ position: 'relative' }}>
          {steps.length === 0 ? (
            <span>No notes</span>
          ) : (
            notes.map((note: string, index: number) => (
              <li key={index}>{note}</li>
            ))
          )}

          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 22,
            }}
            onClick={addNote}
          >
            <AddIcon />
          </Fab>
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
}
