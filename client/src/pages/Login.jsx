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
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
            {/* Ambient Background - Light Theme */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-pink-100/60 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex justify-center mb-4 p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20 ring-4 ring-white">
                             <PlayCircle className="w-8 h-8 text-white stroke-[1.5]" />
                        </div>
                        <h1 className="text-4xl text-slate-800 mb-2" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: '600', fontStyle: 'italic', letterSpacing: '-0.02em' }}>
                            Perfumeria Santiago
                        </h1>
                        <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">Acceso Administrativo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-slate-500 font-bold pl-1">Usuario</label>
                            <Input 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingrese su usuario"
                                className="bg-white/50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 h-12 shadow-sm transition-all hover:bg-white"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs uppercase tracking-wider text-slate-500 font-bold pl-1">Contraseña</label>
                            <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="••••••••"
                                className="bg-white/50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 h-12 shadow-sm transition-all hover:bg-white"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center border border-red-100 font-medium">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xl shadow-slate-200 transition-all duration-300 transform hover:-translate-y-0.5" disabled={loading}>
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Unlock className="w-5 h-5 mr-2" />}
                            {loading ? 'Verificando...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                    
                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                         <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                            Sistema POS &copy; {new Date().getFullYear()}
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
