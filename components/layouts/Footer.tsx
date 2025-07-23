import React from 'react'

function FooterPage() {
    return (
        <footer className="bg-gray-800 border-t border-gray-200 mt-10 py-4 text-center text-sm text-gray-400">
            <p>🍴 Powered by The Groot</p>
            <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </footer>)
}

export default FooterPage