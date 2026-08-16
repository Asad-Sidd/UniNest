export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'owner' | 'admin';
  phone?: string;
  createdAt?: string;
}

export interface AuthResponse {
  status: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'owner' | 'admin';
    token: string;
  };
}
