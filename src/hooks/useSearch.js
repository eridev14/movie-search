import { useEffect, useRef, useState } from "react";

export function useSearch() {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {

        if (isFirstInput.current) {
            isFirstInput.current = query === ''
            return
        }

        if (query === '') {
            setError("el valor no puede ser vacio")
            return
        }

        if (query.length < 3) {
            setError("la busqueda debe tener al menos 3 caracteres")
            return
        }

        if (query.match(/^\d+$/)) {
            setError("no puede buscar un pelicula con un numero")
        }

        setError(null)
    }, [query])

    return { query, setQuery, error }
}