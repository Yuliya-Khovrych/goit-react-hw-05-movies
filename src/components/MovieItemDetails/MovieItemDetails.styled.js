import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled(NavLink)`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  border: 1px solid black;
  cursor: pointer;
  width: 100px;
  &:hover,
  &:focus {
    border: orangered;
    color: white;
    background-color: orangered;
  }
`;

export const Info = styled.div`
  display: flex;
  padding: 20px 0;
`;

export const InfoText = styled.div`
  display: block;
  margin-left: 20px;
  padding: 20px 0;
`;

export const GenreList = styled.li`
  display: inline;
  margin-right: 10px;
`;
