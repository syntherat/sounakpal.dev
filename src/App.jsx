// App.jsx
import { useState } from 'react';
import HomePage from './pages/HomePage';
import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
  { label: 'Work', ariaLabel: 'View my work', link: '#work' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      {/* Always mounted, only visually toggled */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#ff6b6b"
        isFixed={true}
        visible={menuVisible}      
      />

      {/* hero tells us when to show/hide menu */}
      <HomePage onHeroMenuVisibilityChange={setMenuVisible} />
    </>
  );
}

export default App;
