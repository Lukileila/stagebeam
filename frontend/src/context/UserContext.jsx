import {useState, createContext, useContext} from 'react';

const UserContextObj = createContext();

export const useUserContext = () => useContext(UserContextObj)

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    
    return <UserContextObj.Provider value={{user, setUser}}>{children}</UserContextObj.Provider>
}

export default UserContext