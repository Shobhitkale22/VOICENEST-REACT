const API_URL = "http://localhost:5000/api/auth";

export async function signup(userData) {

    const response = await fetch(`${API_URL}/signup`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(userData)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Signup Failed");

    }

    return data;

}

export async function login(userData) {

    const response = await fetch(`${API_URL}/login`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(userData)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message || "Login Failed");

    }

    return data;

}