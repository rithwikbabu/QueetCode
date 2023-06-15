// src/components/Navbar.tsx

import React from 'react';
import Link from 'next/link';
import { NAVBAR_HEIGHT } from '~/constants/styles';

const Navbar: React.FC = () => {
    return (
        <nav className={`absolute h-16`}>
            <Link href="/">
                Home
            </Link>
            {/* Add more links as needed */}
        </nav>
    );
}

export default Navbar;
