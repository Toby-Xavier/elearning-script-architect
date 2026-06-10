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

	// 🎨 Crafto Theme - Minimal, clean, SaaS style
	const styles = {
		outer: {
			minHeight: '100vh',
			background: '#f5f7fa',
			padding: '60px 32px',
			fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
		},
		container: {
			maxWidth: '1000px',
			margin: '0 auto'
		},
		card: {
			background: '#ffffff',
			borderRadius: '20px',
			border: '1px solid #eef2f6',
			boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 8px 20px rgba(0,0,0,0.02)',
			padding: '48px 56px',
			transition: 'all 0.2s ease'
		},
		error: {
			background: '#fef2f2',
			border: '1px solid #fee2e2',
			color: '#dc2626',
			padding: '14px 18px',
			borderRadius: '12px',
			marginBottom: '28px',
			fontSize: '0.875rem',
			display: 'flex',
			alignItems: 'center',
			gap: '10px'
		},
		footer: {
			marginTop: '36px',
			display: 'flex',
			justifyContent: 'flex-end',
			borderTop: '1px solid #f0f2f5',
			paddingTop: '24px'
		},
		startOver: {
			padding: '8px 20px',
			background: 'transparent',
			color: '#5c6b7e',
			border: '1px solid #e2e8f0',
			borderRadius: '30px',
			cursor: 'pointer',
			fontWeight: '500',
			fontSize: '0.875rem',
			transition: 'all 0.2s ease',
			fontFamily: 'inherit'
		}
	};

	return (
		<div style={styles.outer}>
			<div style={styles.container}>
				<div style={styles.card}>
					{error && (
						<div style={styles.error}>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12H7v-2h1v2zm0-3H7V4h1v5z"/>
							</svg>
							{error}
						</div>
					)}

					{!result && !isLoading && (
						<ScriptForm onSubmit={handleGenerate} isLoading={isLoading} />
					)}

					{isLoading && <LoadingIndicator />}

					{result && (
						<>
							<ScriptDisplay result={result} />
							<div style={styles.footer}>
								<button 
									onClick={handleStartOver} 
									style={styles.startOver}
									onMouseEnter={(e) => {
										e.target.style.background = '#f8fafc';
										e.target.style.borderColor = '#cbd5e1';
									}}
									onMouseLeave={(e) => {
										e.target.style.background = 'transparent';
										e.target.style.borderColor = '#e2e8f0';
									}}
								>
									← Start over
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;