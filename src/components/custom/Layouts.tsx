import { type ReactNode } from 'react';

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-layout">
      <div className="bg-blob one" />
      <div className="bg-blob two" />
      <div className="bg-blob three" />
      <div className="page-content">{children}</div>
    </div>
  );
}



function TwoColumnLayout({ children, rightColumn }: { children: ReactNode; rightColumn: ReactNode }) {
  return (
    <div className="dashboard-grid">
      <div className="main-col">{children}</div>
      <div className="right-col">{rightColumn}</div>
    </div>
  );
}

export { TwoColumnLayout, PageLayout}