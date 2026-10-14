 function App() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(`/api/auth/${endpoint}`);
      const res2 = await axios.get(`/api/shops?lat=${lat}&lng=${lng}`);
      // handle responses
    };
    fetchData();
  }, []);
  // rest of component
  return(
   <div></div>
  );
 }                                                                
export default App;
