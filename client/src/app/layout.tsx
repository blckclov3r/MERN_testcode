'use client'

import {Inter} from 'next/font/google'
import createCache from "@emotion/cache";
import {CacheProvider, EmotionCache} from "@emotion/react";
import {ThemeProvider} from "@mui/material";
import theme from "@/lib/theme";
import Header from './../components/Header'
import Box from "@mui/material/Box";
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

const inter = Inter({subsets: ['latin']})

// export const metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// }

// Emotion cache
const cache = createCache({key: 'css', prepend: true}) as EmotionCache;

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>

        <>
            <Header/>
            <Box sx={{mt: 5, pt: 3}}>
                <ApolloProvider client={client}>

                    <CacheProvider value={cache}>
                        <ThemeProvider theme={theme}>
                            {children}
                        </ThemeProvider>
                    </CacheProvider>
                </ApolloProvider>

            </Box>
        </>

        </body>
        </html>
    )
}