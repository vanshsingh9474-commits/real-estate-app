import { Link, Navigate, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const activeClass = "text-blue-600 font-semibold";
  const inactiveClass = "text-gray-600 hover:text-blue-600 font-medium transition-colors";

 
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative overflow-hidden">
        <Link to="/" className="text-3xl font-bold text-blue-600 tracking-tight font-serif">
          REAL<span className="text-gray-800 font-sans">ESTATE</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Home</NavLink>
          <NavLink to="/properties?purpose=Sale" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Buy</NavLink>
          <NavLink to="/properties?purpose=Rent" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Rent</NavLink>
          <NavLink to="/properties" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Properties</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="model">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}