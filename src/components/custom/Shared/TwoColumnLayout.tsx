import type { ReactNode } from "react";

function TwoColumnLayout({
  main,
  rightColumn,
}: {
  main: ReactNode;
  rightColumn?: ReactNode;
}) {
  return (
    <div className={`dashboard-grid${rightColumn ? "" : " dashboard-grid--single"}`}>
      <div className="main-col">{main}</div>
      {rightColumn && <div className="right-col">{rightColumn}</div>}
    </div>
  );
}

export default TwoColumnLayout