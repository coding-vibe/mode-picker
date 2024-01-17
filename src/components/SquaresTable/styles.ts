import { css } from '@emotion/react';

export const wrap = css`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

export const fitContentDimensions = css`
  width: fit-content;
  height: fit-content;
`;

export const cell = css`
  border-right: 1px solid rgba(224, 224, 224, 1);
`;

export const hoveredCell = css`
  background-color: #1976d2;
  border-right: 1px solid #ffffff;
`;

export const paper = css`
  padding: 10px;
`;
