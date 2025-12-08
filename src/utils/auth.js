// Tiny local auth (demo only). In production replace with real backend.
const USERS_KEY = 'almadina_users_v1';
const SESSION_KEY = 'almadina_session_v1';


export function loadUsers(){
try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }catch(e){return []}
}


export function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)); }


export function register({name, email, phone, password}){
const users = loadUsers();
if(users.find(u => u.email === email || u.phone === phone)) {
throw new Error('User with that email or phone already exists');
}
const user = { id: Date.now().toString(), name, email, phone, password: btoa(password) };
users.push(user); saveUsers(users);
// auto-login
localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name }));
return { id: user.id, name: user.name };
}


export function login({emailOrPhone, password}){
const users = loadUsers();
const user = users.find(u => u.email === emailOrPhone || u.phone === emailOrPhone);
if(!user) throw new Error('No user found');
if(user.password !== btoa(password)) throw new Error('Invalid password');
localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, name: user.name }));
return { id: user.id, name: user.name };
}


export function logout(){ localStorage.removeItem(SESSION_KEY); }


export function getSession(){
try{ return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') }catch(e){return null}
}