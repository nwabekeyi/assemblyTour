import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';


// ---------------- Package Card ----------------
const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;

const Img = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
`;

const Body = styled.div`
  padding: 0 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
`;

const Price = styled.div`
  color: #0d9488;
  font-weight: 800;
  font-size: 1.4rem;
  margin: 10px 0;
`;

const List = styled.ul`
  padding: 0;
  margin: 0 0 16px 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.li`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #475569;
  font-size: 0.95rem;
`;

const Btn = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #0f172a;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #1e293b;
  }
`;

function PackageCard({ p, onBook }) {
  return (
    <Card whileHover={{ scale: 1.02 }}>
      <Img src={p.image} alt={p.title} />
      <Body>
        <Price>₦{p.priceNgn.toLocaleString()}</Price>

        <List>
          {p.highlights.map((h, i) => (
            <ListItem key={i}>
              <Check size={18} /> {h}
            </ListItem>
          ))}
        </List>

        <Btn onClick={() => onBook && onBook(p)}>Book Now</Btn>
      </Body>
    </Card>
  );
}

export default PackageCard;