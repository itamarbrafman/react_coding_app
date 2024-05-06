import React from 'react';
import { StyledNavBar, StyledTitle, StyledNav } from '../style';

const Nav = () => (
  <>
    <StyledTitle>Choose Code Block</StyledTitle>
    <StyledNav>
      <ul>
        <li><a href="/promiseHandling">Promise Handling</a></li>
        <li><a href="/asyncCase">Async Case</a></li>
        <li><a href="/eventHandling">Event Handling</a></li>
        <li><a href="/ES6Features">ES6 Features</a></li>
      </ul>
    </StyledNav>
  </>
);

export default Nav;
