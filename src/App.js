import { useState, useEffect } from 'react';
import Tilty from 'react-tilty';
import styles from './App.module.scss';

function App() {
  const [ query, setQuery ] = useState("");
  const [ results, setResults ] = useState({ items: [] });

  useEffect(() => {
    if (query.length > 2) {
      console.log('1')
      const fetchResults = setTimeout(() => {
        makeRequest();
      }, 1000)
      return () => clearTimeout(fetchResults);
    };
  }, [query]);

  const makeRequest = async () => {
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      const data = await res.json();
      console.log(data);
      setResults(data || []);
    } catch(e) {
      throw new Error(e);
    };
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await makeRequest();
    setQuery('');
  };

  const onChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <main className={styles.wholeAppComponent}>
      <section className={`${styles.searchBox} ${styles.section}`}>  
        <h2>Search up users on GitHub</h2>
        <form onSubmit={onSubmitHandler} className={styles.formElement}>
          <input type='text' placeholder='Username' onChange={onChangeHandler} value={query} required/>
          <button>Search</button>
        </form>
      </section>
      <section className={`${styles.resultsSection} ${styles.section}`}>
        <h2>Results</h2>
        <ul>
          {results.items.length > 0 && results.items.map((item) => {
            return <UserData item={item} key={item.id}/>  
          })}
        </ul>
      </section>
    </main>
  );
};
export default App;

const UserData = ({ item }) => {
  return(
    <Tilty>
      <li className={styles.listItem}>  
        <div className={styles.listItemDiv}>
          <img src={item.avatar_url} alt='profile'/>
          <br/>
          <a href={item.url} target='_blank' rel="noopener noreferrer">{item.login}</a>
        </div>
      </li>
    </Tilty>
  );
};
