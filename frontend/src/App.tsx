import InputMask from './components/InputMask';
// import Home from './pages/Home';

const App: React.FC = () => {
  // return <Home />;
  return (
    <div style={{ padding: '200px' }}>
      <InputMask format="(##) ####-####" />
    </div>
  );
};

export default App;
