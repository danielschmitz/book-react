export default function ThemeSwitcher() {

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  }

  return <div className="container">
    <div style={{ textAlign: 'center' }}>
      <a href="#" onClick={() => { setTheme('dark') }}>Dark</a>
      &nbsp;&nbsp;
      <a href="#" onClick={() => { setTheme('light') }}>Light</a>
    </div>
  </div>
};
