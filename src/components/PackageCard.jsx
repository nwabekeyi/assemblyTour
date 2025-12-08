import React from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    box-shadow: 0 30px 60px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.08);
  }
`;

const Img = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.25rem;
  text-align: center;
  padding: 0 12px;
`;

const Body = styled.div`
  padding: 24px 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
`;

const Price = styled.div`
  color: #0d9488;
  font-weight: 800;
  font-size: 1.5rem;
`;

const List = styled.ul`
  padding: 0;
  margin: 0 0 16px 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #475569;
  font-size: 0.95rem;

  svg {
    min-width: 18px;
    min-height: 18px;
    color: #0d9488;
  }
`;

const Btn = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(90deg, #0d9488, #14b8a6);
  color: #ffffff;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(20,184,166,0.3);
  }
`;

export default function PackageCard({ p, onBook }) {
  return (
    <Card whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 280 }}>
      <Img>{p.title}</Img>
      <Body>
        <Title>{p.subtitle}</Title>
        <Price>₦{p.priceNgn.toLocaleString()}</Price>
        <List>
          {p.highlights.map((h, i) => (
            <ListItem key={i}>
              <Check size={20} /> {h}
            </ListItem>
          ))}
        </List>
        <Btn onClick={() => onBook && onBook(p)}>Book / View</Btn>
      </Body>
    </Card>
  );
}
