import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import TopNav from './components/TopNav';
import LoginModal from './components/LoginModal';
import TodoPanel from './components/TodoPanel';
import MyProgram from './pages/MyProgram/MyProgram';

export default function App() {
  const [activeTab, setActiveTab] = useState('my-program');
  const [todosOpen, setTodosOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <TopNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenTodos={() => setTodosOpen(true)}
          onOpenLogin={() => setLoginOpen(true)}
        />
        {activeTab === 'my-program' && <MyProgram onOpenLogin={() => setLoginOpen(true)} />}
        <TodoPanel open={todosOpen} onClose={() => setTodosOpen(false)} activeTab={activeTab} />
        {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </AuthProvider>
    </ThemeProvider>
  );
}
