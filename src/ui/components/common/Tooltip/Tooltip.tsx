import React, {useState} from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type TooltipPropsType = {
   messages: string | null
   severity: "error" | "warning" | "info" | "success"
   open: boolean
   anchorOrigin: {
      vertical: 'top' | 'bottom'
      horizontal: "right" | 'left' | 'center'
   }
}

export const Tooltip: React.FC<TooltipPropsType> = (props) => {
   const {messages, severity, anchorOrigin, open} = props

   const [openTooltip, setOpenTooltip] = useState<boolean>(open)
   const handleClose = () => setOpenTooltip(false)

   return (
      <Snackbar
         anchorOrigin={anchorOrigin}
         open={openTooltip}
         autoHideDuration={1000}
         onClose={handleClose}>
         <MuiAlert
            style={{
               fontFamily: `Mochiy Pop P One, sans-serif`,
               letterSpacing: '2px'
            }}
            variant="filled"
            onClose={handleClose}
            severity={severity}>
            {messages}
         </MuiAlert>
      </Snackbar>
   )
}