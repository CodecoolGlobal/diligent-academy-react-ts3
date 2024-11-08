import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({id: 0, name: '', email: ''});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data: User[] = await response.json();
      setUsers(data);
      setNewUser({ id: data.length + 1, name: '', email: '' });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

      if (!response.ok) {
        throw new Error('Create user failed');
      }

      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({id: users.length + 1, name: '', email: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),

      });

      if (!response.ok) {
        throw new
          Error('Update user failed');
      }

      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser
    = async (userId: number) => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`,
          {
            method: 'DELETE',
          });

        if (!response.ok) {
          throw new Error('Delete user failed');
        }

        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

  const handleInputChange = (event:
    React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser, [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={newUser?.name}
        onChange={handleInputChange}
        name="name"
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser?.email}
        onChange={handleInputChange}
        name="email"
      />
      <button onClick={handleCreateUser}>Create</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleUpdateUser(user)}>Update</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;