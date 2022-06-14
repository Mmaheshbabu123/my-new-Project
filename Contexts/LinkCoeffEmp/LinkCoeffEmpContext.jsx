import { createContext } from 'react';


const LinkCoeffEmpContext = createContext({

});

export default LinkCoeffEmpContext;



/*
{
  const [context, setContext] = useState({})
  const contextValue = { context, setContext }
  return (<LinkCoeffEmpContext.Provider value={contextValue}>
              {children}
          </LinkCoeffEmpContext.Provider>)
}

 */
