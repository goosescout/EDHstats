import Link from 'next/link';
import styled from 'styled-components';

import Logo from '~/assets/icons/Logo';

const HomeLink = () => {
  return (
    <StyledLink href="/">
      <Logo />
    </StyledLink>
  );
};

export default HomeLink;

const StyledLink = styled(Link)`
  height: 50px;
  margin-right: 6px;
`;
