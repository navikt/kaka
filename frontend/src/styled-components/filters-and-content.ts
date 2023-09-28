import { styled } from 'styled-components';
import { BREAK_POINT, GAP } from './constants';

export const FiltersAndContentContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FILTER_WIDTH = 350;

export const FilterSection = styled.div`
  position: fixed;
  left: ${GAP - 4}px;
  top: 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  flex-shrink: 0;
  flex-grow: 0;
  border-right: 1px solid #c6c2bf;
  padding-top: 32px;
  padding-right: 16px;
  padding-left: 4px;
  margin-right: 0;
  width: ${FILTER_WIDTH}px;
  height: 100%;
  overflow-y: auto;
  padding-top: 124px;

  @media (max-width: ${BREAK_POINT}px) {
    position: relative;
    width: 100%;
    left: 0;
    border-right: none;
    padding-top: 16px;
    padding-right: 0;
    height: auto;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${GAP}px;
  padding-bottom: 40px;
  padding-top: ${GAP}px;
  margin-left: ${FILTER_WIDTH + GAP}px;

  @media (max-width: ${BREAK_POINT}px) {
    margin-left: 0;
  }
`;
