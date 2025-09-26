// src/pages/embed/[botId].js

import Head from 'next/head';
import { useRouter } from 'next/router';
import { chatbotData } from '../../data/bots';
import { useEffect, useState } from 'react';

const getBotData = (botId) => chatbotData.find(bot => bot.id === botId);

export default function EmbedPage() {
    const router = useRouter();
    const { botId } = router.query;
    const [bot, setBot] = useState(null);

    useEffect(() => {
        if (botId) {
            setBot(getBotData(botId));
        }
    }, [botId]);

    // Apply a specific class to the body for our CSS to target
    useEffect(() => {
        document.body.classList.add('iframe-embed-page');
        return () => {
            document.body.classList.remove('iframe-embed-page');
        };
    }, []);

    if (!bot || !bot.embedUrl) {
        return (
            <div className="full-page-message-wrapper">
                <p>Loading Agent...</p>
            </div>
        );
    }
    
    return (
        <>
            <Head>
                <title>Agent: {bot.name} | Agentic Collective</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>

            {/* This is the direct iframe embed from your instructions */}
            <iframe 
                src={bot.embedUrl}
                allow="clipboard-read; clipboard-write; microphone"
                title={bot.name}
                className="full-page-iframe"
            ></iframe>
        </>
    );
}