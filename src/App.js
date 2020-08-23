import React,{useEffect,useState}from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories,setRespositories] = useState([]);
  
  useEffect(()=>{
    api.get('repositories').then(response=>{
        setRespositories(response.data)
    });
  },[]);
  
  async function handleAddRepository() {
     const response = await api.post('repositories',{
      title:'REACT delicinha',
      url:'https://github.com/viniciushrk',
      techs:['react','reactNative']
    });
    setRespositories([ ... repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRespositories(repositories.filter(repository => repository.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
