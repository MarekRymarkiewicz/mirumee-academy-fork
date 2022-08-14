import React from "react";
import styles from "./LoadingSpinner.module.css";

/* Element Style Classes */
const loadingSpinnerClasses = `${styles.loadingSpinner}`
const loadingSpinnerBorderClasses = `${styles.loadingSpinnerBorder}`
const loadingSpinnerFillClasses = `${styles.loadingSpinnerFill}`

export const LoadingSpinner: React.FunctionComponent = ({ ...props }) => {
  return (
    <div style={{margin:"auto"}}>
      <svg className={loadingSpinnerClasses}>
        <circle className={loadingSpinnerFillClasses} cx="50%" cy="50%" r="50%">
          
        </circle>
        <circle className={loadingSpinnerBorderClasses} cx="50%" cy="50%" r="50%">
        </circle>
      </svg>
    </div>
  )
}