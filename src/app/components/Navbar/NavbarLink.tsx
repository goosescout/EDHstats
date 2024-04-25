import Link from 'next/link';
import styled from 'styled-components';

import colors, { basicTransition } from '@/utils/colors';
import { header28 } from '@/utils/fonts';

const NavbarLink = styled(Link)`
  padding: 6px 8px;

  ${header28};
  color: ${colors.black};
  text-decoration: none;

  transition: color ${basicTransition};

  &:hover {
    color: ${colors.purple};
  }

  &.active {
    color: ${colors.purple};
  }
`;

export default NavbarLink;
