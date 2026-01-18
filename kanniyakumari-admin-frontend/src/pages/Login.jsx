// Login.jsx
export default function Login() {
  const login = () => {
    localStorage.setItem("admin", "true");
    window.location.href = "/problems";
  };

  return <button onClick={login}>Admin Login</button>;
}
