import { useLocation } from "react-router-dom";

const pathsWithDrawer = ['/'];

const useDrawer = () => {
    const location = useLocation();
    return pathsWithDrawer.includes(location?.pathname);
}

export default useDrawer;