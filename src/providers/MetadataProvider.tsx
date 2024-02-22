import { ReactNode, createContext, useState } from 'react';
// Define the type for the metadata state
type MetadataState = {
  title: string;
  description: string;
  author: string;
  keywords: string[];
};

// Define the type for the context value
type MetadataContextType = {
  metadata: MetadataState;
  updateMetadata: (metadata: Partial<MetadataState>) => void;
};

// Create a context with initial values
export const MetadataContext = createContext<MetadataContextType | undefined>(
  undefined
);
export const MetadataProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<MetadataState>({
    title: '',
    description: '',
    author: '',
    keywords: [],
  });

  const updateMetadata = (newMetadata: Partial<MetadataState>): void => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      ...newMetadata,
    }));
  };

  return (
    <MetadataContext.Provider value={{ metadata, updateMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
};
