import React, { useEffect, useState, useRef} from 'react';
import styled, { keyframes } from 'styled-components';
import { Phone, ChevronDown, Menu, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthModal from '../components/AuthModal';
import { PACKAGES } from '../data/packages';
import { getSession, logout } from '../utils/auth';
import mecca from '../assets/mecca.jpeg'
import Slider from "react-slick";


// ---------------- Colors & Animations ----------------
const colors = {
  primary: '#0d9488',
  secondary: '#f97316',
  neutral: '#0f172a',
  gray: '#64748b',
  white: '#ffffff'
};

const fadeInUp = keyframes`from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}`;
const float = keyframes`0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}`;
const slideIn = keyframes`from{transform:translateX(-100%);}to{transform:translateX(0);}`;
const slideOut = keyframes`from{transform:translateX(0);}to{transform:translateX(-100%);}`;

// ---------------- Styled Components ----------------
const Header = styled.header`
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: ${colors.primary};
  color: ${colors.white};
  padding: 12px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;
const NavInner = styled.div`
  max-width: 1400px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
`;
const Logo = styled.h1`
  font-weight: 900; font-size: clamp(1.5rem,5vw,2.2rem); color: ${colors.white};
  @media(max-width:768px){ font-size:1.3rem; }
`;
const NavLinks = styled.div`
  display:flex; gap:16px; align-items:center;
  @media(max-width:768px){
    position:fixed; top:0; left:0; height:100vh; width:260px;
    flex-direction:column; padding:60px 20px; background:${colors.white};
    gap:20px; z-index:999;
    transform:${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
    animation:${({open}) => open ? slideIn : slideOut} 0.3s forwards;
  }
`;
const NavLink = styled.a`
  text-decoration:none; color:${colors.white}; font-weight:700; font-size:1rem;
  &:hover{ opacity:0.8; }
  @media(max-width:768px){ color:${colors.primary}; }
`;
const CTA = styled.button`
  background:${colors.secondary}; border:none; color:${colors.white};
  padding:10px 16px; border-radius:12px; font-weight:800;
  cursor:pointer; display:flex; gap:8px; align-items:center; transition: transform 0.2s;
  &:hover{ transform: scale(1.05); }
`;
const MobileMenuToggle = styled.div` display:none; cursor:pointer; @media(max-width:768px){ display:block; } `;

const Hero = styled.section`
  height: 100vh; /* Full viewport height */
  background: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)),
              url('../src/assets/pixday090819a-0.avif') center/cover no-repeat fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const HeroInner = styled.div` max-width:1000px; animation:${fadeInUp} 1s ease-out; `;
const H1 = styled.h2`
  font-size:clamp(1.75rem,5vw,3rem); font-weight:900; margin-bottom:12px; line-height:1.1;
`;
const P = styled.p` margin-bottom:20px; color: rgba(255,255,255,0.9); `;
const Scroll = styled.div`
  position:absolute; bottom:24px; left:50%; transform:translateX(-50%);
  animation:${float} 3s ease-in-out infinite;
`;

// ---------------- SearchCard & Inputs ----------------
const SearchCard = styled.div`
  background: ${colors.white}; border-radius: 24px;
  padding: 32px 28px; box-shadow: 0 25px 60px rgba(0,0,0,0.1);
  max-width:1200px; margin:-80px auto 40px; position:relative; z-index:20;
  @media(max-width:768px){ padding:24px 20px; margin:-60px 12px 32px; }
`;
const Grid = styled.div`
  display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:20px; align-items:end;
  @media(max-width:768px){ grid-template-columns:1fr; gap:16px; }
`;
const Label = styled.label` font-weight:700; color:${colors.neutral}; font-size:0.85rem; margin-bottom:6px; display:block; `;
const Input = styled.input`
  padding:14px; border-radius:12px; border:2px solid ${colors.primary}; 
  font-size:0.95rem; background:#ffffff; transition:0.2s;
  &:focus{ outline:none; box-shadow:0 0 0 4px rgba(13,148,136,0.15); border-color:${colors.primary}; }
`;
const Select = styled.select`
  padding:14px; border-radius:12px; border:2px solid ${colors.primary}; width:100%;
  font-size:0.95rem; background:#ffffff; transition:0.2s;
  &:focus{ outline:none; box-shadow:0 0 0 4px rgba(13,148,136,0.15); border-color:${colors.primary}; }
`;
const SearchBtn = styled.button`
  background: linear-gradient(135deg, ${colors.primary}, #14b8a6); color:${colors.white};
  border:none; padding:14px; border-radius:14px; font-weight:800; cursor:pointer;
  width:100%; font-size:1rem; transition:all 0.2s ease;
  &:hover{ transform:translateY(-2px) scale(1.02); box-shadow:0 12px 30px rgba(0,0,0,0.12); }
  &:active{ transform: scale(0.98); }
`;
const FullWidth = styled.div` grid-column:1/-1; display:flex; flex-direction:column; gap:14px; `;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 120px;

  background: 
      linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.96)),
      url(${mecca}) ;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.06);
`;

const TestimonialSection = styled.section`
  margin-top: 60px;
`;

const SectionTitle = styled.h2`
  color: ${colors.neutral};
  font-weight: 900;
  font-size: 2rem;
  margin-bottom: 18px;
`;


const TestimonialCard = styled.div`
  background: ${colors.neutral};
  color: ${colors.white};
  padding: 22px;
  border-radius: 12px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SlideWrap = styled.div`
  padding: 0 15px; /* GAP between carousel items */
`;

const Name = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

const Message = styled.div`
  opacity: 0.9;
  margin-top: 8px;
  line-height: 1.4;
`;

const FooterWrap = styled.footer`
  background: ${colors.neutral};
  color: ${colors.white};
  padding: 48px 20px;
  margin-top: 60px;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterSection = styled.div`
  margin-bottom: 28px;

  @media (max-width: 600px) {
    margin-bottom: 22px;
  }
`;

const FooterTitle = styled.div`
  font-weight: 900;
  font-size: 18px;
`;

const FooterText = styled.div`
  color: #94a3b8;
  margin-top: 8px;
`;

const FooterContactTitle = styled.div`
  font-weight: 800;
  margin-bottom: 8px;
`;

const FooterBottom = styled.div`
  color: ${colors.gray};
  margin-top: 28px;
  font-size: 14px;
`;


// ---------------- Package Card ----------------
const Card = styled(motion.div)` background:${colors.white}; border-radius:18px; overflow:hidden; box-shadow:0 20px 60px rgba(2,6,23,0.06); `;
const Img = styled.div` height:180px; background:linear-gradient(135deg,#0f172a,#14b8a6); color:white; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:20px; `;
const Body = styled.div` padding:18px; `;
const Title = styled.h3` margin:0 0 8px; `;
const Price = styled.div` color:${colors.primary}; font-weight:800; font-size:22px; margin-bottom:8px; `;
const List = styled.ul` padding:0; margin:0 0 12px 0; list-style:none; display:flex; flex-direction:column; gap:8px; `;
const Btn = styled.button` width:100%; padding:12px; border-radius:12px; border:none; background:${colors.neutral}; color:white; font-weight:800; cursor:pointer; transition:0.2s; &:hover{ background:#1e293b; } `;
function PackageCard({p,onBook}){
  return (
    <Card whileHover={{y:-8,scale:1.01}} transition={{type:'spring'}}>
      <Img>{p.title}</Img>
      <Body>
        <Title>{p.subtitle}</Title>
        <Price>₦{p.priceNgn.toLocaleString()}</Price>
        <List>
          {p.highlights.map((h,i)=>(
            <li key={i} style={{display:'flex',gap:10,alignItems:'center'}}><Check size={18} />{h}</li>
          ))}
        </List>
        <Btn onClick={()=>onBook && onBook(p)}>Book / View</Btn>
      </Body>
    </Card>
  );
}

// ---------------- Search Results ----------------
const ResultsGrid = styled.div`
  display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px;
`;
function SearchResults({results,onBook}){
  if(!results.length) return <div style={{textAlign:'center',color:'#64748b',padding:40}}>No packages found. Try different filters.</div>;
  return (
    <ResultsGrid>
      {results.map(r=><PackageCard key={r.id} p={r} onBook={onBook} />)}
    </ResultsGrid>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(getSession());
  const navRef = useRef(null);

  const [from, setFrom] = useState('Lagos');
  const [month, setMonth] = useState('Ramadan 2026');
  const [duration, setDuration] = useState('10');
  const [travellers, setTravellers] = useState('1 Adult');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(PACKAGES);

  useEffect(() => setUser(getSession()), []);

// Close mobile nav when clicking outside
useEffect(() => {
  function handleClickOutside(e) {
    if (mobileOpen && navRef.current && !navRef.current.contains(e.target)) {
      setMobileOpen(false);
    }
  }

  // Close when clicking outside
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [mobileOpen]);



  const handleSearch = e => {
    e && e.preventDefault();
    const q = query.trim().toLowerCase();
    const filtered = PACKAGES.filter(p => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.join(' ').toLowerCase().includes(q);
      const matchesDuration = !duration || String(p.durationDays).includes(duration);
      return matchesQuery && matchesDuration;
    });
    setResults(filtered);
    const el = document.getElementById('results');
    el && el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLogout = () => { logout(); setUser(null); };
  const handleAuth = user => { setUser(user); };

  return (
    <>
   <Header>
        <NavInner>
          <Logo>Assembly Travels & Tours Ltd</Logo>
          <MobileMenuToggle onClick={()=>setMobileOpen(!mobileOpen)}>
            {mobileOpen?<X size={28}/>:<Menu size={28}/>}
          </MobileMenuToggle>
          <NavLinks ref={navRef}  open={mobileOpen}>
            <NavLink href="#packages">Packages</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            {!user ? <CTA onClick={()=>setAuthOpen(true)}><Phone size={16}/>+234 809 000 0000</CTA>
              : <div style={{display:'flex',gap:12,alignItems:'center'}}>
                  <div style={{fontWeight:800}}>Hi, {user.name}</div>
                  <CTA onClick={handleLogout}>Logout</CTA>
                </div>
            }
          </NavLinks>
        </NavInner>
      </Header>

      <main>
        <Hero>
          <HeroInner>
            <H1>Your Sacred Journey to <span style={{ background:`linear-gradient(90deg, ${colors.secondary}, #f59e0b)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Makkah & Madinah</span> — From Nigeria</H1>
            <P>Ministry-approved trips • Flexible payment plans • Expert guides from Nigeria • Pay in NGN</P>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
              <CTA as="a" href="#packages">Explore Packages</CTA>
              <CTA onClick={()=>setAuthOpen(true)}>Book a Callback</CTA>
            </div>
          </HeroInner>
          <Scroll><ChevronDown size={36} /></Scroll>
        </Hero>

        <Container>
          <SearchCard>
            <form onSubmit={handleSearch}>
              <Grid>
                <div>
                  <Label>From City</Label>
                  <Select value={from} onChange={e=>setFrom(e.target.value)}>
                    <option>Lagos</option>
                    <option>Abuja</option>
                    <option>Kano</option>
                    <option>Port Harcourt</option>
                    <option>Ibadan</option>
                  </Select>
                </div>
                <div>
                  <Label>Travel Month</Label>
                  <Select value={month} onChange={e=>setMonth(e.target.value)}>
                    <option>Ramadan 2026</option>
                    <option>Hajj 2026</option>
                    <option>December 2025</option>
                  </Select>
                </div>
                <div>
                  <Label>Duration (days)</Label>
                  <Select value={duration} onChange={e=>setDuration(e.target.value)}>
                    <option value="7">7</option>
                    <option value="10">10</option>
                    <option value="14">14</option>
                    <option value="20">20</option>
                  </Select>
                </div>
                <div>
                  <Label>Travellers</Label>
                  <Select value={travellers} onChange={e=>setTravellers(e.target.value)}>
                    <option>1 Adult</option>
                    <option>Couple</option>
                    <option>Family</option>
                  </Select>
                </div>
                <FullWidth>
                  <Label>Search packages, tags or keywords</Label>
                  <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. VIP Hajj, Deluxe, 5-star" />
                  <SearchBtn type="submit">Find Packages</SearchBtn>
                </FullWidth>
              </Grid>
            </form>
          </SearchCard>

          <section id="results" style={{marginTop:24}}>
            <h3>Results</h3>
            <SearchResults results={results} onBook={p => {!getSession()? setAuthOpen(true) : alert('Proceed to booking flow for '+p.title)}}/>
          </section>

          <section id="packages" style={{ marginTop:60 }}>
            <h2>Popular Packages</h2>
            <SearchResults results={PACKAGES} onBook={p => { !getSession() ? setAuthOpen(true) : alert('Proceed to booking flow for '+p.title) }} />
          </section>

          <section id="services" style={{ marginTop:60 }}>
            <h2>Why choose Assembly Travels & Tours Ltd</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:18, marginTop:18 }}>
              {[
                { title:'NGN Payments & Instalments', desc:'Pay fully in NGN or spread across convenient instalments with local bank support.' },
                { title:'Licensed & Trusted', desc:'We have supported thousands of Nigerian pilgrims since 2004.' },
                { title:'Local Support Desk', desc:'Call +234 809 000 0000 or WhatsApp for instant assistance.' }
              ].map((s,i)=>(
                <div key={i} style={{ background:colors.white, padding:16, borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,0.06)' }}>
                  <h4>{s.title}</h4>
                  <p style={{ margin:0, color:colors.gray }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

  <TestimonialSection>
          <SectionTitle>What Pilgrims Say</SectionTitle>

  <Slider
    dots
    infinite
    speed={500}
    gap={3}
    slidesToShow={2}
    slidesToScroll={1}
    autoplay
    autoplaySpeed={3500}
    responsive={[
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]}
  >
    {[
      { name: "Haji Musa", text: "Very organized. Smooth visa process." },
      { name: "Sister Zainab", text: "Cared for our family throughout." },
      { name: "Alhaji Idris", text: "Best travel experience I have had in years." },
      { name: "Ummu Abdullahi", text: "Their guides in Madinah were extremely helpful." },
      { name: "Brother Sulaiman", text: "Excellent accommodation and transportation." },
      { name: "Aisha Bello", text: "My Hajj was easy because of them. Highly recommended." }
    ].map((t, i) => (
      <SlideWrap key={i}>
        <TestimonialCard>
          <Name>{t.name}</Name>
          <Message>{t.text}</Message>
        </TestimonialCard>
      </SlideWrap>
    ))}
  </Slider>
</TestimonialSection>


        </Container>

        <FooterWrap>
  <FooterContainer>
    <FooterSection>
      <FooterTitle>Assembly Travels & Tours Ltd • Nigeria</FooterTitle>
      <FooterText>Your trusted partner for sacred journeys since 2004.</FooterText>
    </FooterSection>

    <FooterSection>
      <FooterContactTitle>Contact</FooterContactTitle>
      <FooterText>+234 809 000 0000</FooterText>
      <FooterText>hello@assemblytravels.ng</FooterText>
    </FooterSection>

    <FooterBottom>
      © 2025 Assembly Travels & Tours Ltd — Nigeria
    </FooterBottom>
  </FooterContainer>
</FooterWrap>

      </main>

      <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onAuth={handleAuth} />
    </>
  );
}

