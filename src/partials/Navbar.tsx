import {
  NavbarTwoColumns,
  NavMenu,
  NavMenuItem,
  Section,
} from 'astro-boilerplate-components';

const Navbar = () => (
  <Section>
    <NavbarTwoColumns>
      <a href="/">Joca's Blog</a>

      <NavMenu>
        <NavMenuItem href="https://github.com/devjoca">GitHub</NavMenuItem>
        <NavMenuItem href="https://twitter.com/devjoca">Twitter</NavMenuItem>
      </NavMenu>
    </NavbarTwoColumns>
  </Section>
);

export { Navbar };
