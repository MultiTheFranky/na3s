import { Card, CircularProgress } from "@mui/material"

/**
 * Loading component
 * @returns {JSX.Element}
 */
export const Loading = () => {
    return (
        <Card sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
        }}>
            <CircularProgress />
            <span style={{ justifyContent: "center", position: "fixed", top: "55%" }}>Loading...please wait</span>
        </Card>
    )
}