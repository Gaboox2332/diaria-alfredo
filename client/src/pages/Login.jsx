import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Unlock, Loader2, PlayCircle } from 'lucide-react';


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(username, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/10 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex justify-center mb-4 p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg ring-1 ring-white/20">
                             <PlayCircle className="w-8 h-8 text-white stroke-[1.5]" />
                        </div>
                        <h1 className="text-3xl text-white mb-2" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: '500', fontStyle: 'italic', letterSpacing: '0.05em' }}>
                            Santiago Perfumes
                        </h1>
                        <p className="text-slate-400 text-sm font-light tracking-wide">Acceso Administrativo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold pl-1">Usuario</label>
                            <Input 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingrese su usuario"
                                className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/50 h-12"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold pl-1">Contraseña</label>
                            <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/50 h-12"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm text-center border border-red-500/20 backdrop-blur-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-indigo-900/20 transition-all duration-300" disabled={loading}>
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Unlock className="w-5 h-5 mr-2" />}
                            {loading ? 'Verificando...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                    
                    <div className="mt-8 text-center">
                         <p className="text-[10px] text-slate-600 uppercase tracking-widest">
                            Sistema POS &copy; {new Date().getFullYear()}
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
