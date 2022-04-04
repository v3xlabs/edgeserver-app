import '../styles/globals.css'
import type { AppProps } from 'next/app'

// function SignalWeb({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default SignalWeb

import { appWithI18Next } from 'ni18n'
import { ni18nConfig } from '../../ni18n.config'

const SignalEdge = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default appWithI18Next(SignalEdge, ni18nConfig)
