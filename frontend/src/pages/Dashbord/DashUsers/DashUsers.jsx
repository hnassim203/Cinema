import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashUsers.css';

export default function DashUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/users');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error("error", error);
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        
  
        try {
            await axios.put(`http://127.0.0.1:8000/api/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
            alert('succ');
        } catch (error) {
            console.error("error", error);
            alert('error');
        }
    };

    if (loading) return <div className="dash-users"><div className="loading">جاري تحميل المستخدمين...</div></div>;

    return (
        <div className="dash-users">
            <h2>Manage Users</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>#{user.id}</td>
                            <td className="name">{user.name}</td>
                            <td className="email">{user.email}</td>
                            <td>
                                <span className={`role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                                    {user.role.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleRoleChange(user.id, user.role)}
                                    className={`action-btn ${user.role === 'admin' ? 'action-admin' : 'action-make'}`}
                                >
                                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}