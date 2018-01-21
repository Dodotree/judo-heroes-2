import React from 'react';
import { AthleteCard } from './AthleteCard';

export const IndexPage = ({ athletes, url }) => (
  <div className="home">
    <div className="athletes-selector">
      {athletes.map(
        athleteData => <AthleteCard url={url} key={athleteData.id} {...athleteData} />,
      )}
    </div>
  </div>
);

export default IndexPage;
