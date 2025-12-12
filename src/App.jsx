import { useState } from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <Navbar
        visible={menuVisible}
        logoText="SOUNAK"
        items={[
          { label: "Home", href: "#home" },
          { label: "About", href: "#about" },
          { label: "Work", href: "#work" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      <HomePage onHeroMenuVisibilityChange={setMenuVisible} />
    </>
  );
}

export default App;
