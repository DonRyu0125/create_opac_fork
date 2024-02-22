import { MetadataContext } from '@/providers/MetadataProvider';
import { useContext } from 'react';

// Custom hook to access the metadata context
export const useMetadataContext = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error(
      'useMetadataContext must be used within a MetadataProvider'
    );
  }
  return context;
};

// Custom hook to manage metadata state
// export const useMetadata = (): [
//   MetadataState,
//   (metadata: Partial<MetadataState>) => void,
// ] => {
//   const [metadata, setMetadata] = useState<MetadataState>({
//     title: '',
//     description: '',
//     author: '',
//     keywords: [],
//   });

//   // Function to update metadata
//   const updateMetadata = (newMetadata: Partial<MetadataState>): void => {
//     setMetadata((prevMetadata) => ({
//       ...prevMetadata,
//       ...newMetadata,
//     }));
//   };

//   return [metadata, updateMetadata];
// };
