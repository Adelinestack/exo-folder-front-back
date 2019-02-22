import styled from 'styled-components';

const ElementList = styled.ul`
  list-style: none;
`;

const CreationPart = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 3px 3px 17px -6px #9e8383;
`;

const NameInput = styled.input`
  border: 1px solid;
  border-radius: 2px;
  padding: 5px;
  margin: 10px 0;
  font-size: 16px;
`;

const Type = styled.div`
  margin: 0 0 10px 0;
`;

const Button = styled.button`
  background: #d8caca;
  font-size: 1em;
  margin: 10px 0;
  padding: 0.25em 1em;
  border: 2px solid #9e8383;
  border-radius: 3px;
`;

const Path = styled.span`
  font-weight: bold;
  color: green;
`;

export { ElementList, CreationPart, NameInput, Type, Button, Path };
