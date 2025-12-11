// App.jsx
import { useState } from 'react';
import HomePage from './pages/HomePage';
import StaggeredMenu from './components/StaggeredMenu/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '/' },
  { label: 'About', ariaLabel: 'Learn about me', link: '/about' },
  { label: 'Work', ariaLabel: 'View my work', link: '/work' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/sounak.mp4/' },
  { label: 'GitHub', link: 'https://github.com/syntherat' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/sounak-pal/' },
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
        openMenuButtonColor="#000000ff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#b700ffff"
        isFixed={true}
        visible={menuVisible}      
      />

      {/* hero tells us when to show/hide menu */}
      <HomePage onHeroMenuVisibilityChange={setMenuVisible} />
    </>
  );
}

export default App;
