import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const colors = {
  primary: '#0d9488',
  secondary: '#14b8a6',
  neutral: '#0f172a',
  gray: '#64748b',
  white: '#ffffff',
  error: '#dc2626'
};

// Backdrop
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 12px;
`;

// Modal Card
const Card = styled(motion.div)`
  background: ${colors.white};
  border-radius: 24px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 25px 60px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

// Tabs - pill style
const TabsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => active ? colors.primary : '#cbd5e1'};
  background: ${({ active }) => active ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` : colors.white};
  color: ${({ active }) => active ? colors.white : colors.neutral};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 0.95rem;
  flex: 1 1 40%;

  &:hover {
    background: ${({ active }) => active ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` : '#f1f5f9'};
  }

  @media (max-width: 480px) {
    flex: 1 1 45%;
    padding: 8px 12px;
    font-size: 0.9rem;
  }
`;

// Form Rows
const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// Input fields
const Input = styled.input`
  padding: 14px;
  border-radius: 12px;
  border: 2px solid ${colors.primary};
  font-size: 0.95rem;
  background: ${colors.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    box-shadow: 0 0 0 4px rgba(20,184,166,0.15);
  }
`;

// Submit button
const Button = styled.button`
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  color: ${colors.white};
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(20,184,166,0.35);
  }
`;

// Error message
const Error = styled.div`
  color: ${colors.error};
  margin-top: 8px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  word-break: break-word;
`;

// Modal component
export default function AuthModal({ open, onClose, onAuth }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name:'', email:'', phone:'+234', password:'' });
  const [err, setErr] = useState('');

  const login = ({ emailOrPhone, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return user;
  };

  const register = ({ name, email, phone, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email || u.phone === phone)) throw new Error('User already exists');
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      let user;
      if(tab === 'register') {
        if(!form.name || !form.phone || !form.password) throw new Error('Please fill required fields');
        user = register(form);
      } else {
        if(!form.email && !form.phone) throw new Error('Enter email or phone');
        if(!form.password) throw new Error('Enter password');
        user = login({ emailOrPhone: form.email || form.phone, password: form.password });
      }
      onAuth && onAuth(user);
      onClose();
    } catch(e) {
      setErr(e.message);
    }
  }

  if(!open) return null;

  return (
    <Backdrop onClick={onClose}>
      <Card
        onClick={(e)=>e.stopPropagation()}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280 }}
      >
        {/* Tabs */}
        <TabsContainer>
          <Tab active={tab==='login'} onClick={()=>setTab('login')}>Login</Tab>
          <Tab active={tab==='register'} onClick={()=>setTab('register')}>Sign Up</Tab>
        </TabsContainer>

        <form onSubmit={submit}>
          <Row>
            {tab==='register' && (
              <Input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            )}
            <Input placeholder="Email (optional)" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <Input placeholder="Phone e.g. +2348012345678" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <Input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          </Row>

          <Button type="submit">{tab==='register' ? 'Sign Up' : 'Login'}</Button>
          {err && <Error>{err}</Error>}

          <div style={{fontSize:12,color:'#475569',marginTop:12,textAlign:'center'}}>
            By continuing you agree to our Terms. Credentials are stored locally in this demo.
          </div>
        </form>

        <div style={{textAlign:'center', marginTop:12, fontWeight:700, color:colors.primary, fontSize:14}}>
          Assembly Travels & Tours Ltd
        </div>
      </Card>
    </Backdrop>
  );
}
