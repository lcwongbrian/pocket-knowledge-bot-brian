import "./globals.css";

export const metadata = {
    title: "Pocket Knowledge Bot",
    description: "A simple chatbot for querying user facts.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
