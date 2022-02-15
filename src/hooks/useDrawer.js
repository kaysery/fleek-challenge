import { useLocation } from "react-router-dom";

const pathsWithDrawer = ['/'];
//hook to manage if the drawer menu can display or not depending if the
//current route it's allowed to
const useDrawer = () => {
    const location = useLocation();
    return pathsWithDrawer.includes(location?.pathname);
}

export default useDrawer;