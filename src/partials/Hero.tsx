import {
  GradientText,
  HeroAvatar,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Joca</GradientText> 👋
        </>
      }
      description={
        <>
          <p>A Peru-based software engineer.</p>
          Began as a PHP developer, learned about Python frameworks, and now the
          majority of my projects are built using Node.js and TypeScript. I'd
          really like to call myself a backend engineer and also curious about
          other cutting-edge technologies that are entering the market, like
          AI/M.
        </>
      }
      avatar={
        <img
          className="h-80 w-64"
          src="/assets/images/avatar.jpeg"
          alt="Joca"
          loading="lazy"
        />
      }
    />
  </Section>
);

export { Hero };
