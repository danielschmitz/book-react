import styled from "styled-components"


export const Button = styled.button`
  display: inline-block;
  margin: 0.5rem;
  font-size: 1rem;
  line-height: 2;
  text-align: center;
  cursor: pointer;
  background-color: #2196f3;
  color: #fff;
  border: 0px solid #000;
  border-radius: 3px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px -2px rgba(0,0,0,0.4), 0 5px 15px 0 rgba(0,0,0,0.1);
  }

  &:active {
    box-shadow: 0px 0px 0px 0px;
    transform: translateY(2px);
  }
  
  ${props => props.outline && `
    background: white;
    color: black;
    border: 2px solid #2196f3;
  `}

    ${props => props.warning && `
    background: #F8BBD0;
    color: #4A148C;
    border: 2px solid #EC407A;
   `}
 
`
