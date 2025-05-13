import { useState, useEffect } from 'react';
import styles from './RegisterStore.module.css';
import { useAuthentication } from '../hooks/useAuthentication';

const RegisterStore = () => {
    const [storeName, setStoreName] = useState('');
    const [storeEmail, setStoreEmail] = useState('');
    const [storePassword, setStorePassword] = useState('');
    const [storeConfirm, setStoreConfirm] = useState('');
    const [error, setError] = useState('');

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const store = {
            displayName: storeName,
            displayEmail: storeEmail,
            displayPassword: storePassword
        };

        if (storePassword !== storeConfirm) {
            setError("As senhas precisam ser iguais!");
            return;
        }

        await createUser(store);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.register}>
            <h2>Cadastro de Loja</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome da Loja:</span>
                    <input
                        type="text"
                        name="storeName"
                        required
                        placeholder="Nome da loja"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Email da Loja:</span>
                    <input
                        type="email"
                        name="storeEmail"
                        required
                        placeholder="Email comercial"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="storePassword"
                        required
                        placeholder="Senha"
                        value={storePassword}
                        onChange={(e) => setStorePassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Confirmar Senha:</span>
                    <input
                        type="password"
                        name="storeConfirm"
                        required
                        placeholder="Repetir senha"
                        value={storeConfirm}
                        onChange={(e) => setStoreConfirm(e.target.value)}
                    />
                </label>

                {!loading && <button className="btn">Cadastrar Loja</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterStore;
