import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SquaresTable from 'components/SquaresTable';
import Mode from 'types/mode';
import * as classes from './styles';

const REQUEST_URL = 'https://demo3005513.mockable.io/web/modes';

export default function ModePicker() {
  const [modes, setModes] = useState<Mode[]>([]);
  const [selectedModeName, onSelectModeName] = useState<string>('');
  const [selectedMode, onSelectMode] = useState<Mode | null>(null);

  useEffect(() => {
    const fetchModes = async () => {
      try {
        const response = await axios.get<Mode[]>(REQUEST_URL);
        setModes(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchModes();
  }, []);

  const handleClick = () => {
    const mode = modes.find(({ name }) => name === selectedModeName);

    if (mode) {
      onSelectMode(mode);
    }
  };

  return (
    <div css={classes.mainWrap}>
      <div css={classes.wrap}>
        <FormControl>
          <InputLabel>Choose mode</InputLabel>
          <Select
            autoWidth
            css={classes.select}
            label='mode-select'
            labelId='mode-select'
            name='mode'
            onChange={(e) => onSelectModeName(e.target.value)}
            value={selectedModeName}>
            {modes.map(({ name, id }) => (
              <MenuItem
                key={id}
                value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleClick}
          size='large'
          variant='contained'>
          START
        </Button>
      </div>
      {selectedMode && <SquaresTable mode={selectedMode} />}
    </div>
  );
}
