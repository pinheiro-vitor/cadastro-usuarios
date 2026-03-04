import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    setUsers([...users, { id: Date.now(), name, email }]);
    setName('');
    setEmail('');
  };

  const handleRemove = (id) => {
    setUsers(users.filter(user => user.id !== id));
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
                    <td>{user.name}</td>
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
