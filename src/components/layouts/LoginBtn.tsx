import React, { useState } from 'react'
import Link from '../common/Link'


// Se connecter
// "url": "/scripts/mwimain.dll?logon&application=UNION_VIEW&language=144&file=[OPAC]login.html",
// "title": "Se connecter"

const LoginBtn = (nav: any) => {
	const [isLogin, setIsLogin] = useState(false)
	return (
		<>
			{isLogin ? (
				<div>Hello</div>
			) : (
				<li key={nav.title} className="hover:border-b-opac-green">
					<Link
						className="transition no-underline  text-lg text-opac-white hover:text-opac-green"
						href={'/scripts/mwimain.dll?logon&application=UNION_VIEW&language=144&file=[OPAC]login.html'}>
						Login
					</Link>
				</li>
			)}
		</>
	)
}

export default LoginBtn
