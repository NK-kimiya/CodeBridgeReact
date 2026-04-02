import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const [cookies] = useCookies(['jwt-token']);
  const token = cookies['jwt-token'];

  // jwt-token が無ければ / にリダイレクト
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // トークンがあれば、子要素（Appコンポーネント）を表示
  return children;
};

export default RequireAuth