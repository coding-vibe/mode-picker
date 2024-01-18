import { useEffect, useState, startTransition } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Mode from 'types/mode';
import * as classes from './styles';

interface Props {
  mode: Mode;
}

interface HoveredCell {
  selectedRowIndex: number;
  selectedCellIndex: number;
}

const generateMatrix = (length: number) =>
  Array.from({ length }, () => Array.from({ length }, () => false));

export default function SquaresTable({ mode }: Props) {
  const [matrix, updateMatrix] = useState<boolean[][]>(
    generateMatrix(mode.field),
  );
  const [hoveredCells, setHoveredCells] = useState<HoveredCell[]>([]);

  useEffect(() => {
    setHoveredCells([]);
    updateMatrix(generateMatrix(mode.field));
  }, [mode.field]);

  const handleMouseOver = (
    selectedRowIndex: number,
    selectedCellIndex: number,
  ) => {
    updateMatrix((prev) => {
      startTransition(() =>
        setHoveredCells((prev) => [
          ...prev,
          { selectedRowIndex, selectedCellIndex },
        ]),
      );

      return prev.map((row, rowIndex) =>
        selectedRowIndex === rowIndex
          ? row.map((cell, cellIndex) =>
              selectedCellIndex === cellIndex ? !cell : cell,
            )
          : row,
      );
    });
  };

  return (
    <div css={classes.wrap}>
      <TableContainer
        component={Paper}
        css={classes.fitContentDimensions}>
        <Table aria-label='squares table'>
          <TableBody>
            {matrix.map((row, selectedRowIndex) => (
              <TableRow key={selectedRowIndex}>
                {row.map((value, selectedCellIndex) => (
                  <TableCell
                    css={value ? classes.hoveredCell : classes.cell}
                    key={selectedCellIndex}
                    onMouseOver={() =>
                      handleMouseOver(selectedRowIndex, selectedCellIndex)
                    }
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper css={[classes.fitContentDimensions, classes.paper]}>
        <Typography
          component='h3'
          variant='h6'>
          Hover squares
        </Typography>
        {hoveredCells.map(({ selectedRowIndex, selectedCellIndex }, index) => (
          <Typography
            key={index}
            component='p'
            variant='subtitle2'>{`row ${selectedRowIndex} col ${selectedCellIndex} `}</Typography>
        ))}
      </Paper>
    </div>
  );
}
