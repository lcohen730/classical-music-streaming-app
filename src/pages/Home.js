require('dotenv').config()
import { useState } from 'react';

export default function Home(props) {
	const [composer, setComposer] = useState(null);
	const [formData, setFormData] = useState({ searchTerm: "" });

	// code verifier generated as a cryptographic random string with a length between 43 and 128 characters
	const generateRandomString = (length) => {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	// has code verifier using the SHA256 algorithm and return the base64 representation of the hash
	const generateCodeChallenge = async (codeVerifier) => {
		function base64encode(string) {
			return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=+$/, '');
		}

		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await window.crypto.subtle.digest('SHA-256', data);

		return base64encode(digest);
	}

	// request user authorization
	const clientId = process.env.CLIENT_ID;
	const redirectUri = 'http://localhost:6000';

	let codeVerifier = generateRandomString(128);

	generateCodeChallenge(codeVerifier).then(codeChallenge => {
		let state = generateRandomString(16);
		/* let scope = 'user-read-private user-read-email'; */

		localStorage.setItem('code_verifier', codeVerifier);

		let args = new URLSearchParams({
			response_type: 'code',
			client_id: clientId,
			/* scope: scope, */
			redirect_uri: redirectUri,
			state: state,
			code_challenge_method: 'S256',
			code_challenge: codeChallenge
		});

		window.location = 'https://accounts.spotify.com/authorize?' + args;
	});

	// parse the URL and save the code parameter to request the access token afterwards
	const urlParams = new URLSearchParams(window.location.search);
	let code = urlParams.get('code');

	const getUser = async () => {
		try {
			const response = await fetch(
				`https://api.spotify.com/v1/artists/${composerId}`
			);
			// Parse JSON response into a javascript object
			const data = await response.json();
			//set the Movie state to the movie
			setComposer(data);
		} catch (e) {
			console.error(e);
		}
	}
	getUser();

	const getComposer = async (composerId) => {
		// make fetch request and store response
		try {
			const response = await fetch(
				`https://api.spotify.com/v1/artists/${composerId}`
			);
			// Parse JSON response into a javascript object
			const data = await response.json();
			//set the Movie state to the movie
			setComposer(data);
		} catch (e) {
			console.error(e);
		}
	};
	getComposer('3MKCzCnpzw3TjUYs2v7vDA?si=vPD3udl4Q4K8mvGLMyayFw');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		getComposer(formData.searchTerm);
	};

	const loading = () => <>Waiting for search...</>;
	const loaded = () => (
		<div>
			<h1>{composer.name}</h1>
			<h3>{composer.genres}</h3>
			<img src={composer.images[0]} alt={composer.name} />
		</div>
	);

	return (
		<div className="HomePage">
			<center>
				<h1>This is the {props.page} page</h1>
				{/* <form onSubmit={handleSubmit}>
					<label>Search:</label>
					<input
						name="searchTerm"
						type="text"
						onChange={handleChange}
						value={formData.searchTerm}
					/>
					<input type="submit" value="search" />
				</form>
				{ composer && composer.name ? loaded() : loading() } */}
				<div>
					<h1>{composer.name}</h1>
					<h3>{composer.genres}</h3>
					<img src={composer.images[0]} alt={composer.name} />
				</div>
			</center>
		</div>
	)
}
