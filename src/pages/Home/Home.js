/* import * as styles from './Home.module.scss'; */
import './Home.scss';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function Home() {
	const [composer, setComposer] = useState(null);
	const [formData, setFormData] = useState({ searchTerm: "" });
	const [menu, setMenu] = useState('home');

	/* useEffect(function () {
		async function getMenu() {
			setMenu('home');
		}
		getMenu();
		console.log(menu)
	  }, []); */

	const handleMenuClick = (menuName) => {
		setMenu(menuName)
	}

	/* -------- CODE VERIFIER -------- */

	// generated as a cryptographic random string with a length between 43 and 128 characters
	const generateRandomString = (length) => {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	/* -------- CODE CHALLENGE -------- */

	// hash code verifier using the SHA256 algorithm and return the base64 representation of the hash
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

	/* -------- REQUEST USER AUTHORIZATION -------- */

	const clientId = process.env.CLIENT_ID;
	const redirectUri = 'http://localhost:5000';

	let codeVerifier = generateRandomString(128);

	/* generateCodeChallenge(codeVerifier).then(codeChallenge => {
		let state = generateRandomString(16); */
	/* let scope = 'user-read-private user-read-email'; */

	/* localStorage.setItem('code_verifier', codeVerifier);

	let args = new URLSearchParams({
		response_type: 'code',
		client_id: clientId, */
	/* scope: scope, */
	/* redirect_uri: redirectUri,
	state: state,
	code_challenge_method: 'S256',
	code_challenge: codeChallenge
});

window.location = 'https://accounts.spotify.com/authorize?' + args;
}); */

	// parse the URL and save the code parameter to request the access token afterwards
	const urlParams = new URLSearchParams(window.location.search);
	let code = urlParams.get('code');

	/* -------- REQUEST AN ACCESS TOKEN -------- */

	// body of POST request to /api/token
	codeVerifier = localStorage.getItem('code_verifier');

	let body = new URLSearchParams({
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: redirectUri,
		client_id: clientId,
		code_verifier: codeVerifier
	});

	// make the POST request and store the access token by parsing the JSON response from the server
	/* const response = fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('HTTP status ' + response.status);
			}
			return response.json();
		})
		.then(data => {
			localStorage.setItem('access_token', data.access_token);
		})
		.catch(error => {
			console.error('Error:', error);
		}); */

	/* const getUser = async () => {
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
	getUser(); */

	const getComposer = async (composerId) => {
		// make fetch request and store response
		try {
			let accessToken = localStorage.getItem('access_token');
			const response = await fetch(`https://api.spotify.com/v1/artists/${composerId}`, {
				headers: {
					Authorization: 'Bearer ' + accessToken
				}
			});
			// Parse JSON response into a javascript object
			const data = await response.json();
			// set the composer state to the composer
			setComposer(data);
		} catch (e) {
			console.error(e);
		}
	};
	/* getComposer('3MKCzCnpzw3TjUYs2v7vDA?si=vPD3udl4Q4K8mvGLMyayFw'); */

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		getComposer(formData.searchTerm);
	};

	/* const loading = () => <>Waiting for search...</>;
	const loaded = () => (
		<div>
			<h1>{composer.name}</h1>
			<h3>{composer.genres}</h3>
			<img src={composer.images[0]} alt={composer.name} />
		</div>
	); */

	return (
		<div className="homePage">
			{/* <div className={styles.homePage}> */}
			<Routes>
				{/* client-side route that renders the component instance if the path matches the url in the address bar */}
				<Route path="/home" />
				<Route path="/*" element={<Navigate to="/home" />} />
			</Routes>
			<center>
				<h1>TCHAIKOVSKY</h1>
				{menu === 'home' ?
					<div className="options">
						<div onClick={() => handleMenuClick('periods')}>PERIODS</div>
						<div onClick={() => handleMenuClick('moods')}>MOODS</div>
						<div onClick={() => handleMenuClick('composersAZ')}>COMPOSERS</div>
						<div onClick={() => handleMenuClick('instruments')}>INSTRUMENTS</div>
						<div onClick={() => handleMenuClick('discovery')}>DISCOVERY</div>
					</div>
					: menu === 'periods' ?
						<>
							<div className="nav">
								<button onClick={() => handleMenuClick('home')}>HOME</button>
								<button onClick={() => handleMenuClick('home')}>← BACK</button>
							</div>
							<div className="options">
								<div onClick={() => handleMenuClick('subGenres')}>PERIOD</div>
								<div onClick={() => handleMenuClick('subGenres')}>PERIOD</div>
								<div onClick={() => handleMenuClick('subGenres')}>PERIOD</div>
								<div onClick={() => handleMenuClick('subGenres')}>PERIOD</div>
								<div onClick={() => handleMenuClick('subGenres')}>PERIOD</div>
							</div>
						</>
						: menu === 'moods' ?
							<>
								<div className="nav">
									<button onClick={() => handleMenuClick('home')}>HOME</button>
									<button onClick={() => handleMenuClick('home')}>← BACK</button>
								</div>
								<div className="options">
									<div>MOOD</div>
									<div>MOOD</div>
									<div>MOOD</div>
									<div>MOOD</div>
									<div>MOOD</div>
								</div>
							</>
							: menu === 'composersAZ' ?
								<>
									<div className="nav">
										<button onClick={() => handleMenuClick('home')}>HOME</button>
										<button onClick={() => handleMenuClick('home')}>← BACK</button>
									</div>
									<div className="options">
										<div>COMPOSER</div>
										<div>COMPOSER</div>
										<div>COMPOSER</div>
										<div>COMPOSER</div>
										<div>COMPOSER</div>
									</div>
								</>
								: menu === 'instruments' ?
									<>
										<div className="nav">
											<button onClick={() => handleMenuClick('home')}>HOME</button>
											<button onClick={() => handleMenuClick('home')}>← BACK</button>
										</div>
										<div className="options">
											<div>INSTRUMENT</div>
											<div>INSTRUMENT</div>
											<div>INSTRUMENT</div>
											<div>INSTRUMENT</div>
											<div>INSTRUMENT</div>
										</div>
									</>
									: menu === 'discovery' ?
										<>
											<div className="nav">
												<button onClick={() => handleMenuClick('home')}>HOME</button>
												<button onClick={() => handleMenuClick('home')}>← BACK</button>
											</div>
											<p>DISCOVERY PAGE TBD</p>
										</>
										: menu === 'subGenres' ?
											<>
												<div className="nav">
													<button onClick={() => handleMenuClick('home')}>HOME</button>
													<button onClick={() => handleMenuClick('periods')}>← BACK</button>
												</div>
												<div className="options">
													<div onClick={() => handleMenuClick('subGenOpts')}>SUBGENRE</div>
													<div onClick={() => handleMenuClick('subGenOpts')}>SUBGENRE</div>
													<div onClick={() => handleMenuClick('subGenOpts')}>SUBGENRE</div>
													<div onClick={() => handleMenuClick('subGenOpts')}>SUBGENRE</div>
													<div onClick={() => handleMenuClick('subGenOpts')}>SUBGENRE</div>
												</div>
											</>
											: menu === 'subGenOpts' ?
												<>
													<div className="nav">
														<button onClick={() => handleMenuClick('home')}>HOME</button>
														<button onClick={() => handleMenuClick('subGenres')}>← BACK</button>
													</div>
													<div className="options">
														<div onClick={() => handleMenuClick('composersByCat')}>COMPOSERS</div>
														<div onClick={() => handleMenuClick('albums')}>ALBUMS</div>
														<div>PIECES</div>
													</div>
												</>
												: menu === 'composersByCat' ?
													<>
														<div className="nav">
															<button onClick={() => handleMenuClick('home')}>HOME</button>
															<button onClick={() => handleMenuClick('subGenOpts')}>← BACK</button>
														</div>
														<div className="options">
															<div>COMPOSER</div>
															<div>COMPOSER</div>
															<div>COMPOSER</div>
															<div>COMPOSER</div>
															<div>COMPOSER</div>
														</div>
													</>
													: menu === 'albums' ?
														<>
															<div className="nav">
																<button onClick={() => handleMenuClick('home')}>HOME</button>
																<button onClick={() => handleMenuClick('subGenOpts')}>← BACK</button>
															</div>
															<div className="albums">
																<div>ALBUM</div>
																<div>ALBUM</div>
																<div>ALBUM</div>
																<div>ALBUM</div>
																<div>ALBUM</div>
																<div>ALBUM</div>
																<div>ALBUM</div>
															</div>
														</>
														: ""
				}
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
				{/* <button onClick={() => getComposer('3MKCzCnpzw3TjUYs2v7vDA?si=vPD3udl4Q4K8mvGLMyayFw')}>GET INFO ABOUT TCHAIKOVSKY</button>
				{composer ?
					<div>
						<h1>{composer.name}</h1>
						<h3>{composer.genres}</h3> */}
				{/* <img src={composer.images[0]} alt={composer.name} /> */}
				{/* </div>
					: ""} */}
			</center>
		</div>
	)
}
