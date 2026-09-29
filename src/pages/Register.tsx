import React from 'react';
import { Container } from '../components/common/Container';
import { RegisterForm } from '../components/auth/RegisterForm';

export const Register: React.FC = () => {
  return (
    <div className="py-16 bg-slate-950 min-h-[calc(100vh-160px)] flex items-center justify-center">
      <Container size="sm">
        <RegisterForm />
      </Container>
    </div>
  );
};

export default Register;
