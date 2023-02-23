export default function HelloWorld({ name='user', showTitle, onSayHelloClick }) {

  const handleOnClick = () => {
    onSayHelloClick(name)
  }

  return <>
    <article>
      {showTitle && <h1>Hello, world!</h1>}
      <p>
        Nice to meet you, name!
      </p>
      <footer>
        <button onClick={handleOnClick}>Say Hello</button>
      </footer>
    </article>
  </>
};
