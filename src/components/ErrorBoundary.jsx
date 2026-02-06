import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', background: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'monospace' }}>
                    <h1 style={{ color: '#ff4444' }}>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
                        <summary>Click for error details</summary>
                        <p style={{ color: '#ff8888', fontWeight: 'bold' }}>
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <p style={{ color: '#aaa' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </p>
                    </details>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{ marginTop: '2rem', padding: '0.5rem 1rem', background: '#333', color: 'white', border: '1px solid #555', cursor: 'pointer' }}
                    >
                        Go to Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
