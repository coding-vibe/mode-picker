import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Mode from 'types/mode';
import * as classes from './styles';

interface Props {
  mode: Mode;
}

interface HoveredEvents {
  rowIndex: number;
  cellIndex: number;
}

const generateMatrix = (length: number) =>
  Array.from({ length }, () => Array.from({ length }, () => false));

export default function SquaresTable({ mode }: Props) {
  const [matrix, updateMatrix] = useState<boolean[][]>(
    generateMatrix(mode.field),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredEvents, setHoveredEvents] = useState<HoveredEvents[]>([]);

  const handleMouseOver = (rowIndex: number, cellIndex: number) => {
    updateMatrix((prev) => {
      setHoveredEvents((prev) => [...prev, { rowIndex, cellIndex }]);

      return prev.map((row, indexRow) =>
        rowIndex === indexRow
          ? row.map((cell, indexCell) =>
              indexCell === cellIndex ? !cell : cell,
            )
          : row,
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label='squares table'>
        <TableBody>
          {matrix.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((value, cellIndex) => (
                <TableCell
                  css={value ? classes.hoveredCell : classes.cell}
                  key={cellIndex}
                  onMouseOver={() => handleMouseOver(rowIndex, cellIndex)}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
