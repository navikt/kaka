import { Select } from 'nav-frontend-skjema';
import styled from 'styled-components';
import { BREAK_POINT, GAP } from './constants';

export const FiltersAndContentContainer = styled.div`
  position: relative;
  width: 100%;
`;

const FILTER_WIDTH = 320;

export const FilterSection = styled.div`
  position: fixed;
  left: ${2 * GAP}px;
  top: 0;
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
  border-right: 1px solid #c6c2bf;
  padding-top: 32px;
  padding-right: 16px;
  margin-right: 0;
  width: ${FILTER_WIDTH}px;
  height: 100%;
  overflow-y: auto;
  padding-top: 124px;

  @media (max-width: ${BREAK_POINT}px) {
    position: relative;
    width: 100%;
    padding-top: 0;
    left: 0;
    border-right: none;
    padding-right: 0;
    height: auto;
    padding-top: 16px;
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

export const ReadOnlySelect = styled(Select)`
  margin-bottom: 16px;
`;
