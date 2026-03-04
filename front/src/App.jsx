import { useState, useEffect } from 'react'; 
import { Trash2 } from 'lucide-react';
import axios from 'axios'; 
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

 
  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    try {
      // Envia pro Node.js
      await axios.post('http://localhost:3000/usuarios', {
        nome: name,
        email: email
      });
      
      setName('');
      setEmail('');
      
      // Atualiza a tabela buscando os dados novos no servidor
      fetchUsers(); 
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário!");
    }
  };

 
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`);
      
      fetchUsers();
    } catch (error) {
      console.error("Erro ao remover:", error);
      alert("Erro ao remover usuário!");
    }
  };


  return (
    <div className="container">
      <div className="glass-panel">
        <h1 className="title">Cadastro de Usuários</h1>
        
        <form onSubmit={handleSubmit} className="form-group">
          <div className="input-field">
            <label htmlFor="name">Usuário</label>
            <input 
              id="name"
              type="text" 
              placeholder="Digite o nome do usuário" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input 
              id="email"
              type="email" 
              placeholder="Digite o e-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-submit">
            Cadastrar
          </button>
        </form>

        <div className="table-container">
          {users.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    {}
                    <td>{user.nome}</td> 
                    <td>{user.email}</td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => handleRemove(user.id)} 
                        className="btn-remove"
                        aria-label="Remover usuário"
                        title="Remover usuário"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <p>Nenhum usuário cadastrado ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;