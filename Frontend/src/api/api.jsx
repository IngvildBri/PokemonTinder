const API_URL = "http://localhost:5002";

export async function apiRequest(url, options = {}, logout) {
    const res = await fetch(url, options);

    if (res.status === 403) {
        logout();
        return {error: "Session expired"};
    }
    return res.json();
}

export async function signup(username, email, password) {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password})
    });
    return res.json();
}

export async function login(username, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });
    return res.json();
}


export async function getNextPokemon(region, type, token, logout) {
    return apiRequest(
        `${API_URL}/pokemon/next?region=${region}&type=${type}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
        },
        logout
    );
   /* const res = await fetch(`${API_URL}/pokemon/next?region=${region}&type=${type}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    return res.json();*/
}


export async function likePokemon(pokemon_id, token, logout) {
    return apiRequest(
        `${API_URL}/pokemon/like`, { 
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({pokemon_id})
        },
        logout
    );
    /*const res = await fetch(`${API_URL}/pokemon/like`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({pokemon_id})
    });
    return res.json();*/
}


export async function dislikePokemon(pokemon_id, token, logout) {
    return apiRequest(
        `${API_URL}/pokemon/dislike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({pokemon_id})
        },
        logout
    );
    /*const res = await fetch(`${API_URL}/pokemon/dislike`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({pokemon_id})
    });
    return res.json();*/
}



export async function getFavorites(token, logout) {
    return apiRequest(
        `${API_URL}/pokemon/favorites`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        },
        logout
    );
    /*const res = await fetch(`${API_URL}/pokemon/favorites`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    });
    return res.json();*/
}