import React, { PropsWithChildren, useRef, useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string,
}

export const Accordion: React.FunctionComponent<PropsWithChildren<AccordionProps>> = ({ children, title, ...props }) => {
  // Open/Closed Accordion states
  const [isActive, setActive] = useState(false);
  const [bodyHeight, setBodyHeight] = useState("0px");
  const [content, setContent] = useState(props);

  // Accordion style classes
  const accordionClasses = `${styles.accordion}`;
  const accordionHeadClasses = `${styles.accordionHead}${isActive? ` ${styles.active}`:""}`;
  const accordionTitleClasses = `${styles.accordionTitle}`;
  const accordionBodyClasses = `${styles.accordionBody}`;

  // Accordion Body ref hook
  const ref = useRef<HTMLDivElement>();

  // Click handler
  function handleClick(): void {
    setBodyHeight(!isActive? `${ref.current?.scrollHeight}px` : "0px");
    setActive(!isActive);
  }

  // Return TSX element
  return (
    <div className={accordionClasses} {...props}>
      <div className={accordionHeadClasses} onClick={handleClick}>
        <span className={accordionTitleClasses}>
          {title}
        </span>
      </div>
      {/* @ts-ignore */}
      <div ref={ref} className={accordionBodyClasses} style={{maxHeight: bodyHeight}}>
        {children}
      </div>
    </div>
  )
}