import { useEffect, useState } from "react";

export default function Counter(params) {

  // let count = 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count])

  const handleIncrement = () => {
    //count++;
    setCount(count+1);
    //console.log(count);
  }

  const handleDecrement = () => {
    //count--;
    setCount(count-1);
    //console.log(count);
  }

  return <article>
    <header>
      <strong>Counter</strong>
    </header>
    <section>
      Counter value: {count}
    </section>
    <footer style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px'
    }}>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </footer>
  </article>
};
