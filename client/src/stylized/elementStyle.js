import styled from 'styled-components';

const Li = styled.li`
  margin: 10px;
`;

const Button = styled.button`
  background: #fff;
  font-size: 1em;
  margin: 10px 20px;
  padding: 0.25em 1em;
  border: 2px solid #9e8383;
  border-radius: 3px;
`;
const LinkElement = styled.span`
  color: ${props => (props.type === 'Folder' ? '#6e30bb' : '#9e4711')};
`;

export { Li, Button, LinkElement };
