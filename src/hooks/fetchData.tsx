import { useState, useEffect } from 'react';

function getApiData(endpoint: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories'
                    );
                }
                const data = await response.json();
                setData(data);
            }
            catch(error: any) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
        
    }, [endpoint]);

    return { data, loading, error }
}