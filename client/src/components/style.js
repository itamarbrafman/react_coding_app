import styled from 'styled-components';

export const StyledNavBar = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

export const StyledTitle = styled.h1`
  display: flex;
  font-size: 24px;
  margin-bottom: 10px;
  justify-content: center;
  margin: 40px;
`;

export const StyledNav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px 20px;

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
  }

  li {
    margin-right: 20px;
    position: relative; 
  }

  a {
    text-decoration: none;
    color: 'black';
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #ffcc00;
    }
  }

  /* Style the underline */
  li::after {
    content: '';
    position: absolute;
    bottom: -2px; /* Position the underline just below the list item */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #007bff; /* Color of the underline */
    transform: scaleX(0); /* Initially hide the underline */
    transition: transform 0.3s ease;
  }

  li:hover::after {
    transform: scaleX(1); /* Show the underline on hover */
  }
`;
