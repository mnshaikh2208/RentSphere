import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header"><nav className="nav shell" aria-label="Main navigation">
    <Link className="logo" to="/" onClick={close}>Rent<span>Sphere</span></Link>
    <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><i></i><i></i><i></i></button>
    <div className={`nav-links ${open ? 'is-open' : ''}`}><NavLink to="/" onClick={close}>Home</NavLink><NavLink to="/properties" onClick={close}>Properties</NavLink><NavLink to="/vehicles" onClick={close}>Vehicles</NavLink><a href="/#about" onClick={close}>About</a><a href="/#contact" onClick={close}>Contact</a><NavLink className="nav-login" to="/login" onClick={close}>Log in</NavLink></div>
  </nav></header>;
}

export function Footer() { return <footer id="contact" className="footer"><div className="shell footer-grid"><div><Link className="logo" to="/">Rent<span>Sphere</span></Link><p>One thoughtful place to find a home or a ride that fits the way you live.</p></div><div><h4>Explore</h4><Link to="/properties">Rental homes</Link><Link to="/vehicles">Cars & bikes</Link><a href="/#about">How it works</a></div><div><h4>Contact</h4><a href="mailto:hello@rentsphere.demo">hello@rentsphere.demo</a><span>+91 90000 00000</span><span>Mumbai · Pune · Delhi</span></div></div><div className="shell footer-bottom">© 2026 RentSphere · College project demo — no real payments are processed.</div></footer>; }
