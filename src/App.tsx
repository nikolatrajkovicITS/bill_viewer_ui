import './App.css';
import { useBillsQuery } from './hooks/api/useBillsQuery';

function App() {
  const { data, isLoading, isError } = useBillsQuery(1, 10, 'Current');

  console.log({ data, isLoading, isError });
  return (
    <main>
      <h1>Bill Viewer</h1>
    </main>
  );
}

export default App;
