import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
  title: string,
}

export const Accordion: React.FunctionComponent<PropsWithChildren<AccordionProps>> = ({ children, title, ...props }) => {
  // Open/Closed Accordion states
  const [isActive, setActive] = useState(false);
  const [bodyHeight, setBodyHeight] = useState("0px");

  // Accordion style classes
  const accordionClasses = `${styles.accordion}`;
  const accordionHeadClasses = `${styles.accordionHead}${isActive? ` ${styles.active}`:""}`;
  const accordionTitleClasses = `${styles.accordionTitle}`;
  const accordionBodyClasses = `${styles.accordionBody}`;

  // Accordion Body ref hook
  const accordionBody = useRef<HTMLDivElement>();

  // Calculate new body height on content change
  useEffect(() => setBodyHeight(isActive? `${accordionBody.current?.scrollHeight}px` : "0px"),[children]);
  
  // Click handler
  function handleClick(): void {
    setBodyHeight(!isActive? `${accordionBody.current?.scrollHeight}px` : "0px");
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
      <div ref={accordionBody} className={accordionBodyClasses} style={{maxHeight: bodyHeight}}>
        {children}
      </div>
    </div>
  )
}