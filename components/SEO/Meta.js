import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            
            {/* Primary Meta Tags */}
            <title>Adam Badaoui - Portfolio | Systèmes & Réseaux</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Portfolio Adam Badaoui - Systèmes, Réseaux & Cybersécurité" />
            <meta name="description"
                content="Portfolio d'Adam Badaoui. Étudiant BTS SIO SISR, projets systèmes, réseaux, cybersécurité et environnements Linux." />
            <meta name="author" content="Adam Badaoui" />
            <meta name="keywords"
                content="adam badaoui, portfolio adam, bts sio sisr, administration système, réseau, linux, cybersécurité, portfolio kali linux" />
            <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
            <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />


            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="French" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#0f6cbd" />

            {/* Search Engine */}
            <meta name="image" content="/images/logos/fevicon.png" />

            {/* Schema.org for Google */}
            <meta itemProp="name" content="Portfolio Adam Badaoui - Systèmes & Réseaux" />
            <meta itemProp="description"
                content="Portfolio d'Adam Badaoui, étudiant BTS SIO SISR passionné par Linux, réseaux, cybersécurité et administration système." />
            <meta itemProp="image" content="/images/logos/fevicon.png" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Portfolio Adam Badaoui - Systèmes & Réseaux" />
            <meta name="twitter:description"
                content="Portfolio d'Adam Badaoui, BTS SIO SISR. Projets Linux, réseaux, cybersécurité et administration système." />
            <meta name="twitter:site" content="AdamB" />
            <meta name="twitter:creator" content="AdamB" />
            <meta name="twitter:image:src" content="/images/logos/logo_1024.png" />

            {/* Open Graph (Facebook, LinkedIn, etc.) */}
            <meta property="og:title" content="Portfolio Adam Badaoui - Systèmes & Réseaux" />
            <meta property="og:description"
                content="Portfolio professionnel d'Adam Badaoui. Projets systèmes, réseaux, sécurité, Linux et infrastructure." />
            <meta property="og:image" content="/images/logos/logo_1200.png" />
            <meta property="og:url" content="https://ab-portfolio.fr/" />
            <meta property="og:site_name" content="Portfolio Adam Badaoui" />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:type" content="website" />

            <link rel="icon" href="/images/logos/kali_linux.png" />
            <link rel="apple-touch-icon" href="/images/logos/logo.png" />
            <link rel="preload" 
                href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" 
                as="style" />
            <link 
                href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" 
                rel="stylesheet"
            />
        </Head>
    )
}
