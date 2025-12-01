import React from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface MessageBoxProps {
  message: string | null;
  type: 'loading' | 'error' | 'success';
}

export const MessageBox: React.FC<MessageBoxProps> = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    loading: "bg-blue-50 text-blue-800 border-blue-200",
    error: "bg-red-50 text-red-800 border-red-200",
    success: "bg-green-50 text-green-800 border-green-200"
  };

  const icons = {
    loading: <Loader2 className="w-5 h-5 animate-spin mr-2" />,
    error: <AlertCircle className="w-5 h-5 mr-2" />,
    success: <CheckCircle2 className="w-5 h-5 mr-2" />
  };

  return (
    <div className={`flex items-center p-4 mb-6 rounded-lg border ${styles[type]} animate-in fade-in slide-in-from-top-2`}>
      {icons[type]}
      <span className="font-medium">{message}</span>
    </div>
  );
};
