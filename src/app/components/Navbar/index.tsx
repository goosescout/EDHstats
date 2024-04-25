import { useRouter } from 'next/router';
import styled from 'styled-components';

import HomeLink from '@/components/Navbar/HomeLink';
import NavbarLink from '@/components/Navbar/NavbarLink';
import { colorsRGB } from '@/utils/colors';

type LinkDetails = {
  text: string;
  href: string;
};

const links: LinkDetails[] = [
  {
    text: 'Card choices',
    href: '/card-choices',
  },
  {
    text: 'Commanders',
    href: '/commanders',
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <NavWrapper>
      <Content>
        <HomeLink />
        {links.map(({ text, href }) => (
          <NavbarLink
            key={text}
            href={href}
            className={router.pathname === href ? 'active' : ''}
          >
            {text}
          </NavbarLink>
        ))}
      </Content>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.nav`
  background: rgba(${colorsRGB.white}, 0.75);
  box-shadow: 0px 8px 20px 0px rgba(${colorsRGB.black}, 0.15);
  backdrop-filter: blur(16px);

  width: 100%;
  height: 74px;

  position: fixed;
  z-index: 100;
`;

const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 12px 24px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  gap: 28px;
`;
