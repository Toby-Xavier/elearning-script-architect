import React, { useState } from 'react';
import axios from 'axios';
import ScriptForm from './components/ScriptForm';
import LoadingIndicator from './components/LoadingIndicator';
import ScriptDisplay from './components/ScriptDisplay';

function App() {
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleGenerate(formData) {
		setIsLoading(true);
		setError(null);
		setResult(null);
		try {
			const res = await axios.post('http://localhost:3001/generate', formData, {
				headers: { 'Content-Type': 'application/json' },
			});
			setResult(res.data);
		} catch (err) {
			const message = err?.response?.data?.message || err.message || 'Unknown error';
			setError(message);
		} finally {
			setIsLoading(false);
		}
	}

	function handleStartOver() {
		setResult(null);
		setIsLoading(false);
		setError(null);
	}

	const styles = {
		outer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', padding: 24 },
		card: { width: '100%', maxWidth: 800, background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 6px 24px rgba(15,23,42,0.06)' },
		error: { color: '#dc2626', marginBottom: 12 },
		footer: { marginTop: 12, display: 'flex', justifyContent: 'flex-end' },
		startOver: { padding: '8px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 },
	};

	return (
		<div style={styles.outer}>
			<div style={styles.card}>
				{error && <div style={styles.error}>{error}</div>}

				{!result && !isLoading && (
					<ScriptForm onSubmit={handleGenerate} isLoading={isLoading} />
				)}

				{isLoading && <LoadingIndicator />}

				{result && (
					<>
						<ScriptDisplay result={result} />
						<div style={styles.footer}>
							<button onClick={handleStartOver} style={styles.startOver}>Start over</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default App;

