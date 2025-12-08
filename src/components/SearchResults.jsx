import React from 'react';
import PackageCard from './PackageCard';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  padding: 20px 0;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #64748b;
  padding: 60px 20px;
  font-size: 1rem;
  font-weight: 500;
  background: #f8fafc;
  border-radius: 16px;
`;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SearchResults({ results, onBook }) {
  if (!results.length) return <EmptyMessage>No packages found. Try different filters.</EmptyMessage>;

  return (
    <Grid
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      {results.map(r => (
        <motion.div key={r.id} variants={itemVariants}>
          <PackageCard p={r} onBook={onBook} />
        </motion.div>
      ))}
    </Grid>
  );
}
